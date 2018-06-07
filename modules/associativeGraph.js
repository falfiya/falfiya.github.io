const forcePush = (o, k, v) => {
  if (Array.isArray(o[k])) {
    return o[k].push(v);
  }
  o[k] = [v];
  return 1;
};
const forcePushMap = (o, k, v) => {
  const a = o.get(k);
  if (Array.isArray(a)) {
    return a.push(v);
  }
  o.set(k, [v]);
  return 1;
};
const minArrayLength = ary => ary.reduce((a, v, i) => v.length < a[0].length ? [v, i] : a, [ary[0], 0]);
const flatten = ary => [].concat(...ary);
const specialDedupe = (ary) => {
  const tracker = new WeakMap();
  const aryn = [];
  ary.forEach((v) => {
    if (!tracker.has(v)) {
      tracker.set(v, true);
      aryn.push(v);
    }
  });
  return aryn;
};
module.exports = class AssocGraph {
  constructor(i = []) {
    this.reg = new Map();
    this.data = {
      keys: {},
      values: new Map(),
    };
    this.assocAll(...i);
  }
  getReg(key) {
    this.reg.get(key);
  }
  setReg(key, val) {
    this.reg.set(key, val);
  }
  assoc(obj) {
    if (!this.reg.has(obj)) {
      const reg = {
        keys: {},
        values: {},
      };
      this.setReg(obj, reg);
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        reg.keys[key] = forcePush(this.data.keys, key, obj) - 1;
        reg.values[val] = forcePushMap(this.data.values, val, obj) - 1;
      });
    }
    return this;
  }
  assocAll(...a) {
    a.forEach(this.assoc);
  }
  getKey(k) {
    const res = this.data.keys[k];
    return res ? res.filter(v => v) : [];
  }
  getValue(v) {
    const res = this.data.values.get(v);
    return res ? res.filter(e => e) : [];
  }
  deassoc(obj) {
    if (this.reg.has(obj)) {
      const reg = this.reg.get(obj);
      Object.keys(reg.keys).map((key) => {
        const idx = reg.keys[key];
        delete this.data.keys[key][idx];
      });
      Object.keys(reg.values).map((value) => {
        const idx = reg.values[value];
        delete this.data.values.get(value)[idx];
      });
      this.reg.delete(obj);
      return this;
    }
    return false;
  }
  queryPair(key, val) {
    return this.getKey(key).filter(o => o[key] === val);
  }
  queryAllKeys(keys) {
    return specialDedupe(flatten(keys.map(this.getKey.bind(this))));
  }
  queryAllValues(vals) {
    return specialDedupe(flatten(vals.map(this.getValue.bind(this))));
  }
  queryAllPairs(obj) {
    return specialDedupe(flatten(Object.keys(obj).map(key => this.queryPair(key, obj[key]))));
  }
  queryKeys(keys) {
    const kary = keys.map(this.getKey.bind(this));
    const min = minArrayLength(kary);
    keys.splice(min[1], 1);
    return keys.reduce((a, v) => a.filter(o => Object.prototype.hasOwnProperty.call(o, v)), min[0]);
  }
  queryValues(vals) {
    const kary = vals.map(this.getValue.bind(this));
    const min = minArrayLength(kary);
    vals.splice(min[1], 1);
    const valary = min[0].map(obj => [Object.values(obj), obj]);
    return vals.reduce((a, v) => a.filter(ary => ary[0].includes(v)), valary).map(res => res[1]);
  }
  queryPairs(obj) {
    const keys = Object.keys(obj);
    const kary = keys.map(this.getKey.bind(this));
    const min = minArrayLength(kary);
    return keys.reduce((a, v) => a.filter(o => o[v] === obj[v]), min[0]);
  }
};
