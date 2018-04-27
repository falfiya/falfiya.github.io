// Look, verbs are hard. Come up with your own.
const s = {
  diceNoRemainder(n) {
    return this.match(new RegExp(`[\\s\\S]{${n}}`, 'g'));
  },
  dice(n) {
    let d = this.diceNoRemainder(n);
    const xs = -this.length % n;
    if (xs) {
      d = d.shove(this.slice(xs));
    }
    return d;
  },
  mince() {
    return this.split``;
  },
  reverse() {
    return this.mince().reverse().join``;
  },
  every: Array.prototype.every,
  filter: Array.prototype.filter,
  find: Array.prototype.find,
  forEach: Array.prototype.forEach,
  includes: Array.prototype.includes,
  map: Array.prototype.map,
};
const a = {
  // Mutators
  mSet(ary) {
    this.splice(0, this.length, ...ary);
    return this;
  },
  mShove(...args) {
    this.push(...args);
    return this;
  },
  mRemoveIndex(i) {
    this.splice(i, i);
    return this;
  },
  mRotate(n) {
    const r = this.slice(-n);
    this.pop(n);
    return this.mSet(r.concat(a));
  },
  mSnap(n) {
    this.pop(n);
    return this;
  },
  mMap(...args) {
    return this.mSet(this.map(...args));
  },
  mMapIndex(...args) {
    return this.mSet(this.mapIndex(...args));
  },
  // Pure
  copy() {
    return this.slice();
  },
  shove(...args) {
    return this.copy().mShove(...args);
  },
  removeIndex(i) {
    return this.copy().mRemoveIndex(i);
  },
  rotate(n) {
    return this.copy().mRotate();
  },
  snap(n) {
    return this.copy().mSnap();
  },
  pureReverse() {
    return this.copy().reverse();
  },
};
const o = {
  copy() {
    return Object.assign({}, this);
  },
  log() {
    console.log(this);
    return this;
  },
  keysArray() {
    return Object.keys(this);
  },
};
const n = {
  times(fn) {
    return Array(+this).fill(0).forEach((v, i) => fn(i));
  },
};
const as = {
  last() {
    return this[this.length - 1];
  },
  remove(i) {
    return this.mince().removeIndex(i).join``;
  },
  forEachIndex(...args) {
    this.keysArray().forEach(...args);
    return this;
  },
  mapIndex(...args) {
    return this.keysArray().map(...args);
  },
  random() {
    return this[~~(Math.random() * this.length)];
  },
};
Object.defineProperty(this, 'maybe', { get: () => Math.random() > 0.5 });
Object.assign(String.prototype, s);
Object.assign(Number.prototype, n);
Object.assign(Array.prototype, a);
Object.assign(Object.prototype, o);
Object.assign(String.prototype, as);
Object.assign(Array.prototype, as);
