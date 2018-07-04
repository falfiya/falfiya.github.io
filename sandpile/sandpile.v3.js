// This time I'll be optimising for speed
const size = 10;
let data = new Matrix(0);
const history = [];
let dataBuffer = [];
// In version three I'm going to try a different data structure
// I'll have an array of arrays
let drawBuffer = [];
const colors = {
  0: 'white',
  1: 'yellow',
  2: 'orange',
  3: 'red',
  4: 'purple',
  max: '#111',
};
const getColor = v => (v >= maxpileheight ? colors.max : colors[v]);
const maxpileheight = 5;
const del = document.documentElement;
// Document ELement, not delete
const height = () => del.clientHeight;
const width = () => del.clientWidth;
const adjustedHeight = () => height() / size;
const adjustedWidth = () => width() / size;
const c = document.getElementById('c');
function calibrateC() {
  c.height = height();
  c.width = width();
}
calibrateC(); // Needs to run to update the canvas size
// window.addEventListener('resize', calibrateC);
const centerx = Math.round(adjustedWidth() / 2); // Let's not draw half integers
const centery = Math.round(adjustedHeight() / 2);
const ctx = c.getContext('2d');
const drawPixelAt = (x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
  // We want to minimise the calls to this function
};
const pixelIsInsideScreen = (x, y) => x >= 0 && y >= 0 && x <= adjustedWidth() && y <= adjustedHeight();
// If we can ignore the pixel we will
let updateHook = null;
const runhook = () => updateHook && updateHook();
function updata() { // Yep. It updates the data
  runhook();
  const collapse = [];
  dataBuffer.forEach((coords) => { // coords is an object that looks like [x, y]
    const val = data.get(...coords);
    if (val >= maxpileheight) { // It needs to collapse
      collapse.push([...coords, val]);
    }
  });
  const changeLog = []; // Change list
  // changed = [ary]
  const changes = new Matrix(0); // These are the value changes
  collapse.forEach((cv) => { // cv is the coords value combination
    // It looks like [x, y, val]
    const x = cv[0];
    const y = cv[1];
    const val = cv[2];
    const overflow = Math.floor(val / 4);
    // The four is for the four spaces adjacent to a pixel
    const remainder = val % 4;
    const adjacent = [[x, y + 1], [x, y - 1], [x - 1, y], [x + 1, y]];
    // [Up, Down, Left, Right]
    const spread = [];
    adjacent.forEach((coords, indx) => {
      if (pixelIsInsideScreen(...coords)) {
        changes.set(...coords, data.get(...coords) + overflow);
        spread.push(coords);
        // Keep the pixel
      }
    }); // Adjust the adjacent pixels but set the changes to the scoped object
    changes.set(x, y, remainder); // Do the same to the pixel we're at
    changeLog.push(...spread); // Heh, spread operator called on a variable spread
    // Add the adjacent pixels to the changelog
    changeLog.push([x, y]);
    // Same with the pixel we're at
  });
  dataBuffer = [];
  // Don't need that
  changeLog.forEach((coords) => {
    const old = data.get(...coords);
    const oldcolor = getColor(old);
    const neu = changes.get(...coords);
    const neucolor = getColor(neu);
    if (old !== neu) {
      dataBuffer.push(coords);
      // Push only the different pixels to the dataBuffer
      data.set(...coords, neu);
      // We don't need to add here because it's already done before
      if (oldcolor !== neucolor) {
        drawBuffer.push([...coords, neucolor]);
      }
    }
  });
}
function drawFromBuffer() {
  drawBuffer.forEach(cv => drawPixelAt(...cv));
  drawBuffer = [];
}
function drawAll() {
  data.keys().forEach((key) => {
    drawPixelAt(...key, getColor(data.get(...key)));
  });
}
function update() {
  history.push(data.copy());
  updata();
  drawFromBuffer();
  if (history.length > 35) stop();
}
function setPixel(x, y, v) {
  data.set(x, y, v);
  dataBuffer.push([x, y]);
  drawBuffer.push([x, y]);
}
function goBack() {
  data = history.pop().copy();
  drawAll();
}
updateHook = _ => setPixel(centerx, centery, 10);
drawAll();
let x;
const start = () => x = setInterval(update, 100);
const goTo = (i) => { data = history[i]; history.splice(i, history.length); drawAll(); };
function dog() {
  update();
  data.log();
}
const stop = () => clearInterval(x);
window.onclick = _ => console.log(`${Math.round(_.clientX / size)}, ${Math.round(_.clientY / size)}`);
