// Functions
const curry1 = R.curryN(1),
  curry2 = R.curryN(2),
  curry3 = R.curryN(3),
  list = R.unapply(R.identity),
  mutate = curry3((key, val, obj) => obj[key] = val),
  // Λa::elem.λb::str.λc::*.c
  twice = curry3((fn0, fn1, val) => fn0(val, fn1(val))),
  /*
   * Λa::fn.λb::fn.λc::*.a(c)(b(c)
   * This is actually super useful
   */
  toSome = fn => R.compose(R.map(fn), R.pick),
  // Λa::ary.λb::obj.λc::fn.obj
  invoke = fn => fn(),
  /*
   * Web APIs
   * Heh.
   */
  ls = {
    read: R.prop(R.__, localStorage),
    write: R.prop(R.__, localStorage),
  },
  date = (nothing) => {
  // See, this ^ is why OO is trash
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
  mapDOM = document.getElementById("map").contentDocument;
  R.forEach(R.pipe(test, mapDOM.getElementById, test), areas);
}
window.addEventListener("load", main);
