import { no } from "./util.js"
import { Point, Grain } from "./structures.js";
/** @type HTMLCanvasElement */
const c = (document.getElementById("c"));
const ctx = c.getContext("2d", { alpha: false });

let background = "black";
/** The radius of each grain in pixels */
let radius = 10;
const colors = [
  "#F4EDC5",
  "#FAE06C",
  "#FBC25B",
  "#FFAF5A",
  "#ED7973",
  "#DD5080",
  "#9185A5",
  "#73659C",
  "#53509C",
];
let rest = "#334455";

/**
 * Sets the background color of the canvas.
 * Does not redraw. Call <code>init();</code> to redraw
 * 
 * @param {String} color
 */
export const setBackground = color => background = color;

/**
 * @param {Grain} grain
 * 
 * Mills the grain by removing the current grain and drawing a circle there
 */
function mill(grain) {

  // ctx.fillRect(0, 0, c.width, c.height);
  // ctx.fillStyle = "#00A308";
  // ctx.beginPath();
  // ctx.arc(100, 100, 0, 0, Math.PI*2, true);
  // ctx.closePath();
  // ctx.fill();
}
export function init(background, ) {
  const { width, height } = getComputedStyle(c);
  const scale = window.devicePixelRatio;
  c.width = Number(width.slice(0, -2)) * scale;
  c.height = Number(height.slice(0, -2)) * scale;
  // console.log(c.width, c.height);

  // ctx.fillStyle = background;
  // ctx.fillRect(0, 0, c.width, c.height);
  // ctx.fillStyle = "#00A308";
  // ctx.beginPath();
  // ctx.arc(100, 100, radius, 0, Math.PI*2, true);
  // ctx.closePath();
  // ctx.fill();
}
