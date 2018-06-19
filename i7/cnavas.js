const fontName = 'Ubuntu Mono';
class Set {
  constructor(p) {
    this.p = p;
  }
  height(n) {
    this.p.height = n;
    this.p.updateDOM();
    return this.p;
  }
  width(n) {
    this.width = n;
    this.p.updateDOM();
    return this.p;
  }
  size(h, w) {
    this.height = h;
    this.width = w;
    this.p.updateDOM();
    return this.p;
  }
  font(size, bold) {
    this.p.ctx.font = `${bold ? 'bold' : ''} ${size}px '${fontName}', monospace`;
    return this.p;
  }
  cellSize(size) {
    this.p.cellSize = size;
    return this.p;
  }
  fillStyle(v) {
    if (v !== this.p.fillStyle) {
      this.p.ctx.fillStyle = v;
      this.p.fillStyle = v;
    }
    return this.p;
  }
}
export default class Cnavas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext`2d`;
    this.ctx.imageSmoothingEnabled = false;
    this.fillStyle = null;
    this.height = null;
    this.width = null;
    this.set = new Set(this);
    this.xOffset = 0;
    this.yOffset = 10;
  }
  updateDOM() {
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    return this;
  }
  clearCell(x, y) {
    this.ctx.clearRect(this.calcX(x), this.calcY(y), this.cellSize, this.cellSize);
    return this;
  }
  calcX(x) {
    return x * this.cellSize + this.xOffset;
  }
  calcY(y) {
    return y * this.cellSize + this.yOffset;
  }
  clear() {
    this.ctx.clearRect(0, 0, width, height);
  }
}
