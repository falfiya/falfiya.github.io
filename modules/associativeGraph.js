const forcePush = (o, k, v) => {
  if (Array.isArray(o[k])) {
    return o[k].push(v);
  }
  o[k] = [v];
  return 1;
};
const minArrayLength = ary => ary.reduce((a, v) => v.length < a.length ? v : a, ary[0]);
class AssocGraph {
  constructor(...o) {
    this.reg = new Map();
    this.data = {
      keys: {},
      values: {},
    };
    this.assocAll(...o);
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
        reg.values[val] = forcePush(this.data.values, val, obj) - 1;
      });
    }
    return this;
  }
  assocAll(...o) {
    o.forEach(this.assoc);
  }
  getKey(k) {
    const res = this.data.keys[k];
    return res ? res.filter(v => v) : [];
  }
  getValue(v) {
    const res = this.data.values[v];
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
        delete this.data.values[value][idx];
      });
      this.reg.delete(obj);
      return this;
    }
    return false;
  }
  queryKeys(obj) {
    const res = [];
    const kary = Object.keys(obj).map(this.getKey);
    const min = minArrayLength(kary);
  }
  query(keyObj, valObj) {
    const res = [];
    const kary = Object.keys(keyObj).map(key => this.getKey);
    const vary = Object.keys(valObj).map();
  }
  mixedQuery(obj, kval) {

  }
}
query({
  id: 0,
  lastName: 0,
});
const x = new AssocGraph();
const c = {
  firstName: 'cole',
  lastName: 'gannon',
  id: 10380,
};
const g = {
  firstName: 'gail',
  lastName: 'gannon',
};
x.assoc(c);
x.assoc(g);
