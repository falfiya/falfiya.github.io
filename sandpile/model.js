import { no } from "./util.js";
import { Op, Point, Grain } from "./structures.js";
/**
 * @property {Number} width
 * @property {Number} height
 * @property {Number} size
 * @property {Number} overflow
 */
const config = {
  width: 0|0,
  height: 0|0,
  size: 0|0,
  overflow: 0|0,
}
/** @type {Uint8ClampedArray} */
var sandbox;
/** @type {Uint8ClampedArray} */
var readChanges;
/** @type {Array<Op>} */
var queue;
/** @type {Set<Number>} */
const changes = new Set();
/** @type {Set<Number>} */
const unreadChanges = new Set();
/** @param {Point} p */
const inSandbox = p => p.x >= 0 && p.y >= 0 && p.x <= config.width && p.y <= config.height;
/** @param {Point} p */
const indexOf = p => inSandbox(p) ? p.x + p.y * config.width : -1;
/** @param {Number} index */
const pointOf = index => new Point(index % config.width, index / config.width | 0);
/**
 * @param {Number} index
 * @param {Number} value
 */
const _add = (index, value) => queue.push(Op.add(index, value));
/**
 * @param {Number} index
 * @param {Number} value
 * 
 * Does not add to `changes`!
 */
const set = (index, value) => queue.push(Op.set(index, value));
/**
 * @param {Number} index
 * @param {Number} value
 */
const add = (index, value) => {
  index = index|0; value = value|0;
  _add(index, value);
  changes.add(index);
};
/**
 * @param {Number} width in *grains*
 * @param {Number} height in *grains*
 * @param {Number} overflow the height where the grains overflow onto the adjacent squares
 * Initializes the model
 */
export function init(width, height, overflow) {
  if (no(width) || no(height) || no(overflow)) {
    throw TypeError("Each param to init must be an unsigned integer");
  }
  if (overflow < 4) {
    throw Error(`A topple size of ${overflow} doesn't make sense`);
  }
  config.width = width;
  config.height = height;
  config.size = width * height;
  config.overflow = overflow;
  sandbox = new Uint8ClampedArray(config.size);
  readChanges = new Uint8ClampedArray(config.size);
  changes.clear();
  unreadChanges.clear();
  queue = [];
}
/**
 * @param {Point} point
 * @param {Number} value
 * 
 * If the point is valid, adds the `value` to the `sandbox`
 */
export function addToPoint(point, value) {
  const i = indexOf(point);
  if (~i) {
    add(i, value);
  }
}
const addToCoords = (x, y, value) => addToPoint(new Point(x|0, y|0), value);
export { addToCoords as add };
/** Computes changes and then tests for overflow */
export function step() {
  // console.log("step();");
  queue.forEach(op => {
    // console.log(op.toString());
    if (op.set) {
      sandbox[op.index] = op.value;
    } else {
      sandbox[op.index] += op.value;
    }
  });
  queue.length = 0;
  // Set<?>.forEach does not make a copy and forEach off of that
  // if you add and remove items to the set while forEach-ing,
  // it'll forEach over those items too (argh)
  // for that reason, we need to clone the set entries
  [...changes.values()].forEach(index => {
    const value = sandbox[index];
    if (value >= config.overflow) {
      const point = pointOf(index);
      // console.log(point.toString());
      const overflow = value / 4 | 0;
      const remainder = value % 4;
      set(index, remainder);
      addToPoint(point.above(), overflow);
      addToPoint(point.below(), overflow);
      addToPoint(point.left (), overflow);
      addToPoint(point.right(), overflow);
    } else {
      changes.delete(index);
    }
    unreadChanges.add(index);
  });
}

/**
 * What changed since I last checked?
 * 
 * @returns {Array<Grain>}
 */
export function whatChanged() {
  const out = [];
  unreadChanges.forEach(index => {
    const value = sandbox[index];
    if (readChanges[index] != value) {
      readChanges[index] = value;
      /** @type {any} */
      const grain = pointOf(index);
      grain.value = value;
      out.push(/** @type {Grain} */ (grain));
    }
  });
  unreadChanges.clear();
  return out;
}

/**
 * Give me every grain you got
 * 
 * @returns {Array<Grain>}
 */
export function allGrains() {
  const out = [];
  sandbox.forEach((value, index) => {
    if (readChanges[index] != value) {
      /** @type {any} */
      const grain = pointOf(index);
      grain.value = value;
      out.push(/** @type {Grain} */ (grain));
    }
  });
  readChanges = sandbox.slice();
  unreadChanges.clear();
  return out;
}

/**
 * `whatChanged` but tiered into rows
 * 
 * @returns {Array<Array<Point>>} a tieredGrainery
 */
export function whatChangedTiered() {
  const out = [];
  unreadChanges.forEach(index => {
    const value = sandbox[index];
    if (readChanges[index] != value) {
      readChanges[index] = value;
      if (!out[value]) {
        out[value] = [];
      }
      out.push(pointOf(index));
    }
  });
  unreadChanges.clear();
  return out;
}
// Debugging

/** A `pri(?:nt|m)itive` way of viewing the sandbox. Only meant for debugging */
export function print() {
  const heightLength = config.height.toString().length;
  const longestByte = sandbox.reduce((a, v) => {
    const l = v.toString().length;
    return l > a ? l : a;
  }, 0);
  const strings = [];
  var rowIndex = 0;
  while (rowIndex < config.height) {
    strings[rowIndex] = `${rowIndex.toString().padStart(heightLength, " ")}: `;
    const rowOffset = rowIndex * config.width;
    sandbox
      .subarray(rowOffset, rowOffset + config.width)
      .forEach(i => strings[rowIndex] += i.toString().padStart(longestByte, " ") + " ");
    rowIndex++;
  }
  strings.forEach(row => console.log(row));
}

export function go() {
  step();
  print();
}
