function promiseSuccess(v) {
  const res = this.res.shift();
  this.rej.shift();
  if (res) {
    res(v);
  }
}
function promiseFailure(e) {
  const rej = this.rej.shift();
  this.res.shift();
  if (rej) {
    rej(e);
  }
}
function next() {
  this.promise = null;
  const fn = this.fns.shift();
  if (fn) {
    this.promise = fn();
    attachListener.call(this);
  }
}
function attachListener() {
  this.promise
    .then(promiseSuccess.bind(this))
    .catch(promiseFailure.bind(this))
    .finally(next.bind(this));
}
module.exports = class PromiseQueue {
  constructor() {
    this.fns = [];
    this.res = [];
    this.rej = [];
    this.promise = null;
  }
  push(fn) {
    if (this.promise) {
      const p = new Promise((res, rej) => {
        this.res.push(res);
        this.rej.push(rej);
      });
      this.fns.push(fn);
      return p;
    }
    const p = fn();
    this.res.push(null);
    this.rej.push(null);
    this.promise = p;
    attachListener.call(this);
    return p;
  }
  // push a promise returning function to the queue
};
