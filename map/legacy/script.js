// Functions
const curry1 = R.curryN(1);
const curry2 = R.curryN(2);
const curry3 = R.curryN(3);
const list = R.unapply(R.identity);
const mutate = curry3((key, val, obj) => obj[key] = val);
// λa::elem.λb::str.λc::*.c
const twice = curry3((fn0, fn1, val) => fn0(val, fn1(val)));
// λa::fn.λb::fn.λc::*.a(c)(b(c)
// This is actually super useful
const toSome = fn => R.compose(R.map(fn), R.pick);
// λa::ary.λb::obj.λc::fn.obj
const invoke = fn => fn();
// Web APIs
// Heh.
const ls = {
  read: R.prop(R.__, localStorage),
  write: R.prop(R.__, localStorage),
};
const date = (nothing) => {
  // see, this ^ is why OO is trash
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hour: date.getHours(),
    minutes: date.getMinutes(),
  };
};
let mapDOM;
const test = (...v) => { console.warn(v); v[0]; };
function main() {
  mapDOM = document.getElementById('map').contentDocument;
  R.forEach(R.pipe(test, mapDOM.getElementById, test), areas);
}
window.addEventListener('load', main);