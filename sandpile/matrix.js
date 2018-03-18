class Matrix {
  constructor(d, values = []) { // d is the default value
    this.default = d;
    this.values = values;
  }
  existsy(y) {
    return !!this.values[y];
  }
  exists(x, y) {
    return this.existsy(y) && !!this.values[y][x];
  }
  gety(y) {
    return this.values[y] || [];
  }
  getx(x, ary) {
    return ary[x] || this.default;
  }
  get(x, y) {
    return this.getx(x, this.gety(y));
  }
  set(x, y, v) {
    if (this.existsy(y)) {
      this.values[y][x] = v;
    } else {
      (this.values[y] = [])[x] = v;
    }
    return this;
  }
  remove(x, y) {
    if (this.exists(x, y)) {
      if (this.values[y].length - 1) {
        delete this.values[y][x];
      } else {
        delete this.values[y];
      }
    }
    return this;
  }
  mutator(x, y, fn) {
    this.set(x, y, fn(this.get(x, y)));
    return this;
  }
  add(x, y, n) {
    return this.mutator(x, y, v => v + n);
  }
  subtract(x, y, n) {
    return this.add(x, y, -n);
  }
  multiply(x, y, n) {
    return this.mutator(x, y, v => v * n);
  }
  divide(x, y, n) {
    return this.mutator(x, y, v => v / n);
  }
  copy() {
    return new Matrix(this.default, Object.assign([], this.values.map(arr => Object.assign([], arr))));
  }
  log() {
    const copy = Object.assign([], this.values.map(arr => Object.assign([], arr)));
    for (var i = 0; i < copy.length; i++) {
      copy[i] = copy[i] || [];
      for (var j = 0; j < copy[i].length; j++) {
        copy[i][j] = copy[i][j] || this.default;
      }
    }
    const str = copy.map(a => a.map(v => '0'.repeat(3-((''+v).length))+v).join(' ')).join('\n');
    console.log(str);
    return this;
  }
  keys() {
    const k = [];
    Object.keys(this.values).forEach((y) => {
      const ylayer = this.values[y];
      Object.keys(ylayer).forEach((x) => {
        k.push([+x, +y]);
      });
    });
    return k;
  }
}
