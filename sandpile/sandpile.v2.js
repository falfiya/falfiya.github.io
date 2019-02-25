const size = 5,
  data = [
  ],
  updated = {
    "0, 1": 1,
    "1, 0": 1,
  },
  drawbuffer = {},
  maxpileheight = 4,
  colors = {
    0: "white",
    1: "yellow",
    2: "orange",
    3: "red",
    4: "purple",
    max: "#111",
  },
  del = document.documentElement,
  height = () => del.clientHeight,
  width = () => del.clientWidth,
  c = document.getElementById("c");
function calibrateC() {
  c.height = height();
  c.width = width();
}
calibrateC(); // Running it just to make sure
// Window.addEventListener('resize', calibrateC);
const centerx = Math.ceil((width() / size) / 2), // Basically Math.ceil
  centery = Math.ceil((height() / size) / 2), // For both of these
  ctx = c.getContext("2d"),
  pixelAt = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
  },
  pixelIsInsideScreen = (x, y) => x >= 0 && y >= 0 && x <= width() && y <= height(),
  queueForUpdate = (x, y) => {
    const coords = `${x}, ${y}`;
    updated[coords] = 1;
    drawbuffer[coords] = 1;
  },
  finishedUpdateOn = (x, y) => {
    const coords = `${x}, ${y}`;
    delete updated[coords];
  },
  drewFromBufferAt = (x, y) => {
    const coords = `${x}, ${y}`;
    delete drawbuffer[coords];
  },
  dataAt = (x, y) => {
    const datay = data[y];
    if (datay) {
      const datax = datay[x];
      return Number.isInteger(datax) ? datax : 0; // What if it's undefined or something?
    }
    return 0;
  },
  setPixel = (x, y, val) => {
    if (pixelIsInsideScreen(x, y)) {
      const datay = data[y];
      if (datay) {
        datay[x] = val;
      } else {
        data[y] = [];
        data[y][x] = val;
      }
      queueForUpdate(x, y);
      return val;
    }
  },
  add = (a, b) => a + b,
  addToPixel = (x, y, v) => setPixel(x, y, add(v, dataAt(x, y))),
  addToPixelsCenter = (ary) => {
    ary.forEach((ylayer, y) => ylayer.forEach((xval, x) => addToPixel(x + centerx, y + centery, xval)));
  },
  dropp = (obj) => {
    Object.keys(obj).forEach((coords) => {
      const args = [...coords.split`, `.map((v, i) => (v[0] === "a" ? Number(v.slice(1)) : Number(v.slice(1)) + [centerx, centery][i])), obj[coords]];
      addToPixel(...args);
    });
  },
  addToPixelsCenterX = (ary) => {
    ary.forEach((ylayer, y) => ylayer.forEach((xval, x) => addToPixel(y, x + centery, xval)));
  };
function update() {
  drop();
  Object.keys(updated).map((coords) => {
    const xy = coords.split`, `,
      x = xy[0] - 0, // Coerse to a number
      y = xy[1] - 0, // Same here
      val = dataAt(x, y);
    if (val >= maxpileheight) {
      const jae = Math.floor(val / maxpileheight),
        la = val % maxpileheight;
      addToPixel(x, y + 1, jae); // Up
      addToPixel(x, y - 1, jae); // Down
      addToPixel(x - 1, y, jae); // Left
      addToPixel(x + 1, y, jae); // Right
      setPixel(x, y, la); // Center
    }
    finishedUpdateOn(x, y);
  });
}
let drawbool = true;
function draw() {
  Object.keys(drawbuffer).map((coords) => {
    const xy = coords.split`, `,
      x = Number(xy[0]), // Coerse to a number
      y = Number(xy[1]), // Same here
      val = dataAt(x, y),
      color = val > maxpileheight ? colors.max : colors[val];
    pixelAt(x, y, color);
    drewFromBufferAt(x, y);
  });
}
setInterval((_) => {
  update();
  if (drawbool) draw();
}, 1);

onclick = () => drawbool ^= 1;
