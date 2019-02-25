const canvas = document.getElementById("c"),
  cnavas = document.getElementById("C"),
  image = document.getElementById("i"),
  imageHeight = i.naturalHeight,
  imageWidth = i.naturalWidth;
t = 0;
canvas.height = cnavas.height = imageHeight;
canvas.width = cnavas.width = imageWidth;
const ctx = canvas.getContext("2d"),
  cxt = cnavas.getContext("2d");
ctx.drawImage(image, 0, 0);
const data = ctx.getImageData(0, 0, 10, 10),
  fillStyle = (color) => {
    if (cxt.fillStyle !== color) cxt.fillStyle = color;

  },
  halftoneR = 10,
  GID = (x, y) => {
    if (x >= 0 && x <= imageWidth && y >= 0 && y <= imageHeight) return ctx.getImageData(x, y, halftoneR, halftoneR);

    console.error(`${x} , ${y} is out of bounds! Try again.`);
    return ctx.getImageData(x, y, halftoneR, halftoneR);
  },
  myriadColors = (myriad) => {
    const ary = [];
    myriad.data.forEach((v, i) => {
      const c = i % 4;
      if (!c) ary.push([]);

      ary[ary.length - 1].push(v);
    });
    return ary;
  },
  drawCircle = (cx, cy, r, color) => {
    t++;
    fillStyle(color);
    cxt.beginPath();
    cxt.arc(cx, cy, r, 0, 2 * Math.PI, false);
    cxt.fill();
  },
  meanColor = (...arys) => arys.reduce((a, v) => [a[0] + v[0], a[1] + v[1], a[2] + v[2]], [0, 0, 0]).map(v => v / arys.length),
  computeBrightness = ary => Math.round(ary.reduce((a, v) => a + v, 0) / 3),
  phantom = (x, y) => {
    const r = 10 * (halftoneR * computeBrightness(meanColor(...myriadColors(GID(x, y))))) / 255;
    drawCircle(x + halftoneR, y + halftoneR, r, "black");
  };
let xT = 0 | imageWidth / halftoneR,
  yT = 0 | imageHeight / halftoneR;
/*
 * For (let Y = 0; Y < yT - 1; Y ++) {
 * for (let X = 0; Y < xT - 1; X ++) {
 * phantom(X * 10, Y * 10);
 * if (X * 10 > imageWidth) {
 * console.warn('Huh?');
 * break;
 * }
 * }
 * }
 */
/*
 * Data.data.forEach((v, i) => {
 * const ax = 0 | i / 4;
 * const x = ax % data.width;
 * const c = i % 4;
 * const y = 0 | ax / data.width;
 * if (!c) {
 * if (!x) {
 * rgbadata[y] = [];
 * }
 * rgbadata[y][x] = [];
 * }
 * rgbadata[y][x].push(v);
 * }, []);
 */
