const settings = {
  size: 10,
};
let timesX = 0;
let timesY = 0;
const canvas = d3.select('#c');
const ctx = canvas.node().getContext`2d`;
const svg = d3.select('#s');
let data;

const img = new Image();
img.src = 'image_pain.png';
img.onload = () => {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  timesX = 0 | w / settings.size;
  timesY = 0 | h / settings.size;
  canvas
    .attr('width', w)
    .attr('height', h);
  svg
    .attr('width', w)
    .attr('height', h);
  ctx.drawImage(img, 0, 0);
  init();
};
Array.roundAll = ary => ary.map(Math.round);
const Matrix = {
  switchAxis(matrix, xlength = matrix[0].length, ylength = matrix.length) {
    const m = Matrix.neew(xlength, ylength);
    Array(xlength).fill``.forEach((v, x) => {
      Array(ylength).fill``.forEach((V, y) => {
        m[x][y] = matrix[y][x];
      });
    });
    return m;
  },
  neew(xlength, ylength) {
    return Array(xlength).fill``.map(v => Array(ylength));
  },
  fillNeew(xlength, ylength, v = 0) {
    return Array(xlength).fill(0).map(V => Array(ylength).fill(v));
  },
};
const getImageData = (x, y) => ctx.getImageData(x, y, settings.size, settings.size);
const collectColors = (imageData) => {
  const data = imageData.data;
  const colorCount = data.length / 4;
  return Array(colorCount).fill``.map((v, i) => data.slice(i * 4, i * 4 + 4));
};
const meanColor = pipes(Matrix.switchAxis, 0, R.map(d3.mean));
const computeBrightness = ary => ary.reduce((a, v) => a + v, 0) / ary.length;
const meanOfChunk = pipes(getImageData, collectColors, meanColor, computeBrightness, Math.round);
function init() {
  data = Matrix.fillNeew(100, 10).map((v, i) => v.map((V, I) => {
    console.log(`Getting data from x:${I * 10} , y:${i * 10}`);
    return meanOfChunk(I * 10, i * 10);
  }));
  const g = svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('id', (v, i) => i)
    .selectAll('circle')
    .data(R.identity)
    .enter()
    .append('circle')
    .attr('id', (v, i) => i)
    .attr('cx', (v, i) => (i * settings.size) + settings.size / 2)
    .attr('cy', function() {
      return (settings.size / 2) + this.parentNode.id * settings.size;
    })
    .attr('r', brightness => (settings.size * brightness / 255) / 2);
}
