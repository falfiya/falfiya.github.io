export default class KAV {
  constructor(ary = []) {
    this.data = {};
    ary.forEach(this.push);
  }
  push(obj) {
    Object.values(obj).forEach((val) => {
      if (this.data[val]) {
        this.data[val].push(obj);
      } else {
        this.data[val] = [obj];
      }
    });
    return this;
  }
  get(key) {
    return this.data[key];
  }
  getFirst(key) {
    return this.get(key)[0];
  }
}
