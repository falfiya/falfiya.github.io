const size = 15,
  data = [],
  dataBuffer = {},
  drawBuffer = {},
  maxpileheight = 5,
  colors = {
    0: "white",
    1: "yellow",
    2: "orange",
    3: "red",
    4: "purple",
    max: "#111",
  },
  getColor = val => (val >= maxpileheight ? colors.max : colors[val]),
  del = document.documentElement,
  height = del.clientHeight,
  width = del.clientWidth,
  adjustedHeight = height / size,
  adjustedWidth = width / size,
  // Document ELement, not delete
  c = document.getElementById("c"),
  calibrateC = () => {
    c.height = height;
    c.width = width;
  };
calibrateC(); // Running it just to make sure
// Window.addEventListener('resize', calibrateC);
const centerx = Math.round(adjustedWidth / 2), // Try to place it in the center of the screen, ish
  centery = Math.round(adjustedHeight / 2),
  ctx = c.getContext("2d", { alpha: false }),
  bg = "black";
ctx.fillStyle = bg; // This is the background color
ctx.fillRect(0, 0, width, height); // Since alpha is false, fill the background
const pixelAt = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
  },
  pixelIsInsideScreen = (x, y) => x >= 0 && y >= 0 && x <= adjustedWidth && y <= adjustedHeight,
  // Okay, that may seem like a lot but try reading it. It's not THAT bad
  queueForDraw = (x, y) => {
    const coords = `${x}, ${y}`;
    drawBuffer[coords] = 1;
  },
  queueForUpdate = (x, y) => {
    const coords = `${x}, ${y}`;
    dataBuffer[coords] = 1;
  },
  removeFromDataBuffer = (x, y) => {
    const coords = `${x}, ${y}`;
    delete dataBuffer[coords];
  },
  removeFromDrawBuffer = (x, y) => {
    const coords = `${x}, ${y}`;
    delete drawBuffer[coords];
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
    const current = dataAt(x, y);
    if (current !== val) {
    // Only run if it's being changed
      const datay = data[y];
      if (datay) {
        datay[x] = val;
      } else {
        data[y] = [];
        data[y][x] = val;
      }
      if (getColor(val) !== getColor(current) && pixelIsInsideScreen(x, y)) {
      // If the color of the pixel is different and it's inside the screen
        queueForDraw(x, y);
      }
      queueForUpdate(x, y);
      return val;
    }
  },
  add = (a, b) => a + b,
  addToPixel = (x, y, v) => setPixel(x, y, add(v, dataAt(x, y))),
  updateHook = null,
  runHook = () => updateHook !== null && updateHook(),
  update = () => {
    runHook();
    Object.keys(dataBuffer).map((coords) => {
      const xy = coords.split`, `,
        x = Number(xy[0]), // Coerse to a number
        y = Number(xy[1]), // Same here
        val = dataAt(x, y);
      if (val >= maxpileheight) {
        const overflow = Math.floor(val / 4),
          // We don't want to round it
          remainder = val % 4;
        // We're dividing this by four because that's the amount of adjacent pixels
        addToPixel(x, y + 1, overflow); // Up
        addToPixel(x, y - 1, overflow); // Down
        addToPixel(x - 1, y, overflow); // Left
        addToPixel(x + 1, y, overflow); // Right
        setPixel(x, y, remainder); // Current
      }
      removeFromDataBuffer(x, y);
    // We're done with the update
    });
  };
let draww = true;
const draw = () => {
  Object.keys(drawBuffer).map((coords) => {
    const xy = coords.split`, `,
      x = Number(xy[0]), // Coerse to a number
      y = Number(xy[1]), // Same here
      val = dataAt(x, y),
      color = getColor(val);
    pixelAt(x, y, color);
    removeFromDrawBuffer(x, y);
  });
};
let dropp = true;
/*
 * Yes, draww and dropp are bad names for variables
 * They're better than foo or bar or something
 */
const drop = () => addToPixel(centerx, centery, 10),
  step = () => {
    if (dropp) drop();

    if (draww) draw();

    update();
    window.requestAnimationFrame(step);
  };
window.requestAnimationFrame(step);
window.onclick = (e) => {
  // This let's us control the sandpile when it's running
  if (e.ctrlKey) {
    // If the control key is being pressed, toggle the draw function
    draww ^= 0;
  } else {
    // If not, just toggle the drop function
    dropp ^= 0;
  }
};
