const size = 5;
const data = [
];
const updated = {
  '0, 1': 1,
  '1, 0': 1,
};
const drawbuffer = {};
const maxpileheight = 4;
const colors = {
  0: 'white',
  1: 'yellow',
  2: 'orange',
  3: 'red',
  4: 'purple',
  max: '#111',
};
const del = document.documentElement;
const height = () => del.clientHeight;
const width = () => del.clientWidth;
const c = document.getElementById('c');
function calibrateC() {
  c.height = height();
  c.width = width();
}
calibrateC(); // Running it just to make sure
// window.addEventListener('resize', calibrateC);
const centerx = Math.ceil((width() / size) / 2); // Basically Math.ceil
const centery = Math.ceil((height() / size) / 2); // For both of these
const ctx = c.getContext('2d');
const pixelAt = (x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
};
const pixelIsInsideScreen = (x, y) => x >= 0 && y >= 0 && x <= width() && y <= height();
const queueForUpdate = (x, y) => {
  const coords = `${x}, ${y}`;
  updated[coords] = 1;
  drawbuffer[coords] = 1;
};
const finishedUpdateOn = (x, y) => {
  const coords = `${x}, ${y}`;
  delete updated[coords];
};
const drewFromBufferAt = (x, y) => {
  const coords = `${x}, ${y}`;
  delete drawbuffer[coords];
};
const dataAt = (x, y) => {
  const datay = data[y];
  if (datay) {
    const datax = datay[x];
    return Number.isInteger(datax) ? datax : 0; // What if it's undefined or something?
  }
  return 0;
};
const setPixel = (x, y, val) => {
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
};
const add = (a, b) => a + b;
const addToPixel = (x, y, v) => setPixel(x, y, add(v, dataAt(x, y)));
const addToPixelsCenter = (ary) => {
  ary.forEach((ylayer, y) => ylayer.forEach((xval, x) => addToPixel(x + centerx, y + centery, xval)));
};
const dropp = (obj) => {
  Object.keys(obj).forEach((coords) => {
    const args = [...coords.split`, `.map((v, i) => (v[0] === 'a' ? +v.slice(1) : +v.slice(1) + [centerx, centery][i])), obj[coords]];
    addToPixel(...args);
  });
};
const addToPixelsCenterX = (ary) => {
  ary.forEach((ylayer, y) => ylayer.forEach((xval, x) => addToPixel(y, x + centery, xval)));
};
function update() {
  drop();
  Object.keys(updated).map((coords) => {
    const xy = coords.split`, `;
    const x = xy[0] - 0; // Coerse to a number
    const y = xy[1] - 0; // Same here
    const val = dataAt(x, y);
    if (val >= maxpileheight) {
      const jae = Math.floor(val / maxpileheight);
      const la = val % maxpileheight;
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
    const xy = coords.split`, `;
    const x = +xy[0]; // Coerse to a number
    const y = +xy[1]; // Same here
    const val = dataAt(x, y);
    const color = val > maxpileheight ? colors.max : colors[val];
    pixelAt(x, y, color);
    drewFromBufferAt(x, y);
  });
}
setInterval((_) => {
  update();
  if (drawbool) { draw(); }
}, 1);

onclick = () => drawbool ^= 1;
