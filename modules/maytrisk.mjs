export default class Maytrisk {
  constructor(ary = []) {
    this.data = ary;
    this.changes = [];
  }
  get(x, y) {
    const why = this.data[y];
    if (why) {
      return why[x];
    }
    return null;
  }
  set(x, y, v) {
    this.changes.push({ x, y });
    const d = this.data;
    if (!d[y]) {
      d[y] = [];
    }
    d[y][x] = v;
    return this;
  }
  forEach(fn) {
    this.data.forEach((yLayer, y) => yLayer.forEach((xVal, x) => fn(xVal, x, y, yLayer, this.data)));
    return this;
  }
  map(fn) {
    return new Maytrisk(this.data.map((yLayer, y) => yLayer.map((xVal, x) => fn(xVal, x, y, yLayer, this.data))));
  }
  clone() {
    return new Maytrisk(this.data.map(yLayer => yLayer.slice()));
  }
  clearChanges() {
    this.changes = [];
  }
}
