const pipes = (_ => _ = ((P, A = Array.isArray) => (...f) => (...a) => f.reduce((b, w) => (A(w) ? w.map(v => (A(v) ? _(...v)(...b) : P(b, v))) : [P(b, w)]), a)[0])((a, v) => (~~v == v ? a[v] : v(...a))))();
const debug = false;
const log = (...args) => debug && console.log(...args);
const warn = (...args) => debug && console.warn(...warn);
const size = 6;
const data = [
];
const updated = {
  '0, 1': 1,
  '1, 0': 1,
};
const drawbuffer = {

};
const maxpileheight = 4;
const colors = {
  0: 'white',
  1: 'yellow',
  2: 'orange',
  3: 'red',
  4: 'purple',
  max: 'black',
};
const d4 = () => 0 | (Math.random() * 4);
// It's like d3 except d4
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
const centerx = 0 | ((width() / size) / 2 + 1); // Basically Math.ceil
const centery = 0 | ((height() / size) / 2 + 1); // For both of these
const ctx = c.getContext('2d');
const pixelAt = (x, y, color) => {
  const coords = `${x}, ${y}`;
  log(`Drawing (${coords}) to the canvas`);
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
};
const pixelIsInsideScreen = (x, y) => x >= 0 && y >= 0 && x <= width() && y <= height();
const queueForUpdate = (x, y) => {
  const coords = `${x}, ${y}`;
  log(`Added (${coords}) to the update list`);
  updated[coords] = 1;
  drawbuffer[coords] = 1;
};
const finishedUpdateOn = (x, y) => {
  const coords = `${x}, ${y}`;
  log(`Finished updating (${coords})`);
  log('Removing it from the updated list');
  log(delete updated[coords]);
};
const drewFromBufferAt = (x, y) => {
  const coords = `${x}, ${y}`;
  log(`Just drew from the buffer at (${coords})`);
  log('Removing it from the drawbuffer');
  log(delete drawbuffer[coords]);
};
const dataAt = (x, y) => {
  const coords = `${x}, ${y}`;
  log(`Getting (${coords})`);
  const datay = data[y];
  if (datay) {
    const datax = datay[x];
    return Number.isInteger(datax) ? datax : 0; // What if it's undefined or something?
  }
  warn(`Look's like there's nothing in the ${y} layer of data. Returning 0 instead`);
  return 0;
};
const setPixel = (x, y, val) => {
  const coords = `${x}, ${y}`;
  if (pixelIsInsideScreen(x, y)) {
    log(`Set (${coords}) to ${val}`);
    const datay = data[y];
    if (datay) {
      datay[x] = val;
    } else {
      warn(`Looks like the ${y} layer of data doesn't exist. Making one`);
      data[y] = [];
      data[y][x] = val;
    }
    queueForUpdate(x, y);
    return val;
  }
  warn(`Uh, (${coords}) isn't a valid value`);
};
const setPixels = (...ary) => {
  ary.map((ylayer, y) => ylayer.map((xval, x) => setPixel(x, y, xval)));
};
const add = (a, b) => a + b;
const addToPixel = pipes([0, 1, 2, dataAt], [0, 1, [[2, 3], add]], setPixel);
const addToPixelsCenter = (ary) => {
  log(ary);
  ary.map((ylayer, y) => ylayer.map((xval, x) => addToPixel(x + centerx, y + centery, xval)));
};
// all because I didn't want to be repetitive
function update() {
  drop();
  Object.keys(updated).map((coords) => {
    const xy = coords.split`, `;
    const x = xy[0] - 0; // Coerse to a number
    const y = xy[1] - 0; // Same here
    const val = dataAt(x, y);
    log(`Updating (${coords}) who's value is ${val}`);
    if (val) {
      if (val >= maxpileheight) {
        log('The pile is ready to topple');
        const jae = 0 | val / maxpileheight;
        const la = val % maxpileheight;
        addToPixel(x, y + 1, jae); // Up
        addToPixel(x, y - 1, jae); // Down
        addToPixel(x - 1, y, jae); // Left
        addToPixel(x + 1, y, jae); // Right
        setPixel(x, y, la); // Center
      } else {
        // It doesn't need an value update. It just needs to be redrawn
        finishedUpdateOn(x, y);
      }
    } else {
      log('Value is nothing.');
      finishedUpdateOn(x, y);
    }
  });
}
let draW = true;
function draw() {
  Object.keys(drawbuffer).map((coords) => {
    const xy = coords.split`, `;
    const x = xy[0] - 0; // Coerse to a number
    const y = xy[1] - 0; // Same here
    const val = dataAt(x, y);
    const color = val > maxpileheight ? colors.max : colors[val];
    pixelAt(x, y, color);
  });
}
const dropPattern = [
  [1, 2],
  [2, 1],
];
function drop() {
  addToPixelsCenter(dropPattern);
}
setInterval((_) => {
  update();
  draW && draw();
}, 1);

onclick = _ => draW ^= 1;
