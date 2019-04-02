/**
 * @property {Number} x
 * @property {Number} y
 */
export class Point {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    x = x|0; y = y|0;
    this.x = x;
    this.y = y;
  }
  above() {
    return new Point(this.x, this.y - 1);
  }
  below() {
    return new Point(this.x, this.y + 1);
  }
  left() {
    return new Point(this.x - 1, this.y);
  }
  right() {
    return new Point(this.x + 1, this.y);
  }
  toString() {
    return `${this.x}, ${this.y}`;
  }
}
/** @property {Number} value */
export class Grain {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y, value) {
    x = x|0; y = y|0; value = value|0;
    this.x = x;
    this.y = y;
    this.value = value;
  }
}
/**
 * An operation to be queued
 */
export class Op {
  static add(index, value) {
    return new Op(index, value, false);
  }
  static set(index, value) {
    return new Op(index, value, true);
  }
  /**
   * @param {Number} index
   * @param {Number} value
   * @param {boolean} set
   * Makes a point
   */
  constructor(index, value, set) {
    this.index = index;
    this.value = value;
    this.set = set;
  }
  toString() {
    return `${this.index} ${this.set ? "" : "+"}= ${this.value}`;
  }
}
