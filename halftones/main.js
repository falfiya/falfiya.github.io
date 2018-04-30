// Vars
const settings = {};
const canvas = d3.select('#c');
const ctx = canvas.node().getContext`2d`;
const svg = d3.select('#s');
const file = d3.select('#file');
const filebutton = d3.select('#filebutton');
const num = d3.select('#number');
const start = d3.select('#start');
const svgc = d3.select('.container');
// Functions
const Matrix = {
  switchAxis(matrix, xlength = matrix[0].length, ylength = matrix.length) {
    const m = Matrix.neew(ylength, xlength);
    Array(xlength).fill``.forEach((v, x) => {
      Array(ylength).fill``.forEach((V, y) => {
        m[x][y] = matrix[y][x];
      });
    });
    return m;
  },
  neew(xlength, ylength) {
    return Array(ylength).fill``.map(v => Array(xlength));
  },
  fillNeew(xlength, ylength, v = 0) {
    return Array(ylength).fill(0).map(V => Array(xlength).fill(v));
  },
  slowmap(matrix, fn, ms = 50, xlength = matrix[0].length, ylength = matrix.length) {
    let cx = 0;
    let cy = 0;
    const f = () => {
      if (cx === xlength) {
        // cx has gone beyond what it should be
        if (cy + 1 === ylength) {
          // then we can't incriment it
          clearInterval(i);
          return 0;
          // cb(m);
        } else {
          cy++;
          cx = 0;
        }
      } else {
        m[cy][cx] = fn(matrix[cy][cx], cx, cy, matrix);
        cx++;
      }
      return 1;
    }
    const m = Matrix.neew(xlength, ylength);
    const i = setInterval(() => {
      f() && f() && f();
    }, ms);
  },
};

const getImageData = (x, y) => ctx.getImageData(x, y, settings.size, settings.size);
const collectColors = (imageData) => {
  const data = imageData.data;
  const colorCount = data.length / 4;
  return Array(colorCount).fill``.map((v, i) => data.slice(i * 4, i * 4 + 4));
};
const map = fn => ary => ary.map(v => fn(v));
const meanColor = pipes(Matrix.switchAxis, 0, map(d3.mean));
const computeBrightness = ary => ary.reduce((a, v) => a + v, 0) / ary.length;
const computeDarknessFromBrightness = n => 255 - n;
const clearRect = (x, y) => ctx.clearRect(x, y, settings.size, settings.size);
const meanOfChunk = pipes([getImageData, clearRect], 0, collectColors, meanColor, computeBrightness, computeDarknessFromBrightness, Math.round);

// Globals
let timesX = 0;
let timesY = 0;
let img = new Image();
d3.select('#download').on('click', function () {
  d3.select(this)
    .attr('href', `data:application/octet-stream;base64,${btoa(d3.select('#svgcontainer').html())}`)
    .attr('download', 'images.svg');
});
filebutton.on('click', () => {
  file.node().click();
});
file.on('click', () => {
  const file = d3.select('input[type=file]').node().files[0];
  const reader = new FileReader();
  start.style('opacity', 1);
  start.on('click', () => {
    reader.addEventListener('load', () => {
      img.src = reader.result;
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

// Async Stuff
// Choose Image --> Wait for it to load --> Slowmap
img.onload = () => {
  settings.size = num.node().value;
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  timesX = 0 | w / settings.size;
  timesY = 0 | h / settings.size;
  canvas
    .attr('width', w)
    .attr('height', h);
  svgc
    .style('width', w + 'px')
    .style('background', 'white');
  svg
    .attr('width', w)
    .attr('height', h)
    .attr('xmlns', 'http://www.w3.org/2000/svg');
  ctx.drawImage(img, 0, 0);
  init();
  img = null;
  const l = d3.select('.right');
  l.style('opacity', 0);
  setTimeout(() => l.style('display', 'none'), 400);
};

function init() {
  Matrix.slowmap(Matrix.fillNeew(timesX, timesY), (v, x, y) => {
    const m = meanOfChunk(x * settings.size, y * settings.size);
    svg.append('circle')
      .attr('cx', x * settings.size + settings.size / 2) // YOu may n0w fixx
      .attr('cy', y * settings.size + settings.size / 2)
      .attr('r', (settings.size * m / 255) / 2);
  }, 1);
}
