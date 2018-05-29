const c = document.getElementById('canvas');
const size = 10;
c.width = window.innerWidth;
c.height = window.innerHeight;
const ctx = c.getContext`2d`;
const ary = [[]];
const map = Array(8).fill``.reduce((a, v, i) => {
  let key = i.toString(2);
  key = '0'.repeat(3 - key.length) + key;
  a[key] = +110.0.toString(2)[7 - i] || 0;
  return a;
}, {});
let currentFillStyle = '#000000';
ctx.imageSmoothingEnabled = false;
const fillStyle = (c) => {
  if (currentFillStyle !== c) {
    ctx.fillStyle = currentFillStyle = c;
  }
};
fillStyle('white');
const drawPixel = (x, y) => ctx.fillRect(x * size, y * size, size, size);
const clearPixel = (x, y) => ctx.clearRect(x * size, y * size, size, size);
const drawPixelFromInt = (x, y, int) => int ? drawPixel(x, y) : clearPixel(x, y);
function computeValue(x, y) {
  const layer = ary[y - 1] || [1];
  const above = [layer[-1], layer[0], layer[1]].map(v => ~~v);
  const k = above.join``;
  const v = map[k];
  layer[x] = v;
  ary[y] = layer;
  return v;
}
const drawPixelAt = (x, y) => drawPixelFromInt(x, y, computeValue(x, y));
const pixelsX = ~~(c.width / size);
const pixelsY = ~~(c.height / size);
Array(pixelsY).fill``.forEach((v, y) => Array(pixelsX).fill``.forEach((V, x) => drawPixelAt(x, y)));
