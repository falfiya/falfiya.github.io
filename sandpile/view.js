import { no } from "./util.js"
import { Point, Grain } from "./structures.js";
import * as model from "./model.js";

/** @type HTMLCanvasElement */
const c = (document.getElementById("c"));
const ctx = c.getContext("2d", { alpha: false });

var background = "black";
/** The radius of each grain in pixels */
var radius = 10;
var diameter = radius * 2;
let scale;
const colors = [
  // "#F4EDC5",
  // "#FAE06C",
  // "#FBC25B",
  // "#FFAF5A",
  // "#ED7973",
  // "#DD5080",
  // "#9185A5",
  // "#73659C",
  // "#53509C",
  "red",
  "orange",
  "teal",
  "indigo",
];

var rest = "#334455";
/** @type {Array<HTMLCanvasElement>} */
var grains;
/** @type {HTMLCanvasElement} */
var restCanvas;
/** @param {Grain} grain */
const getGrainCanvas = grain => grains[grain.value] || restCanvas;

/**
 * Sets the background color of the canvas.
 * Does not redraw. Call <code>init();</code> to redraw
 * 
 * @param {String} color
 */
export const setBackground = color => background = color;

/** @param {Grain} grain */
const renderCircle = grain => ctx.drawImage(
  getGrainCanvas(grain),
  grain.x * diameter,
  grain.y * diameter,
  diameter, diameter
);

const preCompute = () => {
  scale = window.devicePixelRatio;
}
/** @param {String} color of the circle on the canvas */
const grainCanvas = color => {
  const c = document.createElement("canvas");
  c.width = c.height = diameter * scale;
  const ctx = c.getContext("2d", { alpha: false })
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, diameter, diameter);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
  return c;
}

const computeGraphics = () => {
  preCompute();
  grains = colors.map(grainCanvas);
  restCanvas = grainCanvas(rest);
}

var firstInit = true;
export function init() {
  computeGraphics();
  const { width, height } = getComputedStyle(c);
  c.width = Number(width.slice(0, -2)) * scale;
  c.height = Number(height.slice(0, -2)) * scale;
  if (firstInit) {
    firstInit = false;
  } else {
    model.allGrains().forEach(renderCircle);
  }
}

/**
 * @param {Array<Grain>} grainery
 */
export function drawGrains(grainery) {
  grainery.forEach(renderCircle);
}
/** @param {Array<Array<Point>>} tieredGrainery */
export function drawPixels(tieredGrainery) {  
  tieredGrainery.forEach((grainList, value) => {
    ctx.fillStyle = colors[value] || rest;
    grainList.forEach(grain => {
      ctx.fillRect(grain.x * diameter, grain.y * diameter, diameter, diameter);
    });
  });
}
