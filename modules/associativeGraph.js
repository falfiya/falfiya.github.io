// Well, I think my code makes sense but I'm half awake
// I would leave comments but I don't care enough right now
// I'm super going to regret that
// Things named with one letter generally mean a word that starts with the letter
// a = apple, o = orange, v = violium etc...
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
}
const minArrayLength = ary => ary.reduce((a, v) => v.length < a.length ? v : a, ary[0]);
const flatten = ary => [].concat(...ary);
const dedupe = (ary) => {
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
class AssocGraph {
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
  orQueryKeys(obj) {
    let keyAry;
    if (Array.isArray(obj)) {
      keyAry = obj;
    } else {
      keyAry = Object.keys(obj);
    }
    return dedupe(flatten(keyAry.map(this.getKey.bind(this))));
  }
  orQueryValues(obj) {
    let valAry;
    if (Array.isArray(obj)) {
      valAry = obj;
    } else {
      valAry = Object.keys(obj).map(key => obj[key]);
    }
    return dedupe(flatten(valAry.map(this.getValue.bind(this))));
  }
  andQueryKeys(obj) {
    const res = [];
    const keys = Object.keys(obj);
    const kary = keys.map(this.getKey);
    const min = minArrayLength(kary);
  }
}
const x = new AssocGraph();
const c = {
  firstName: 'cole',
  lastName: 'gannon',
  id: 10380,
};
const g = {
  firstName: 'gail',
  lastName: 'gannon',
  company: 'ensante',
};
x.assoc(c);
x.assoc(g);
