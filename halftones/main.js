const canvas = document.getElementById('c');
const image = document.getElementById('i');
const imageHeight = i.naturalHeight;
const imageWidth = i.naturalWidth;
canvas.height = imageHeight;
canvas.width = imageWidth;
const ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0);
const data = ctx.getImageData(0, 0, 10, 10);
class rgba {
  constructor(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  }
  array() {
    return [this.red, this.green, this.blue, this.alpha];
  }
  css() {
    return `rgba(${this.array()})`;
  }
}
[
  [[]]
]
const rgbadata = [];
data.data.forEach((v, i) => {
  const ax = 0 | i / 4;
  const x = ax % data.width;
  const c = i % 4;
  const y = 0 | ax / data.width;
  if (!c) {
    if (!x) {
      rgbadata[y] = [];
    }
    rgbadata[y][x] = [];
  }
  rgbadata[y][x].push(v);
}, []);
