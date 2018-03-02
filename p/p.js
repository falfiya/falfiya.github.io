const inc = a => a + 1;
const dec = a => a - 1;
const add = (a, b) => a + b;
const mtp = (a, b) => a * b;
const pipea = (...fns) => arg => fns.reduce((acc, val) => (Array.isArray(val) ? val.map(f => f(acc)) : val(acc)), arg);
// apipe: ... => * => *
const pipes = (() => {
  const p = (P =>
    (...ary) =>
      (...args) =>
        ary.reduce((acc, val) =>
          (Array.isArray(val) ? val.map(v =>
            (Array.isArray(v) ? p(...v)(...acc) : P(acc, v))) : [P(acc, val)]
          ), args)[0]
  )((args, val) => (Number.isInteger(val) ? args[val] : val(...args)));
  return p;
})();
const pipeline = (aryty, ...fns) => (...args) => fns.reduce((acc, fn, idx) => {
  const thisarity = aryty[idx];
  const thisargs = acc.i.concat(acc.o.slice(0, thisarity));
  return {
    i: [fn(...thisargs)],
    o: acc.o.slice(thisarity),
  };
}, { i: [], o: args }).i[0];
// pipeline: ary => ... => ... => *
const chara = (keys, fn, obj) => fn(...(Array.isArray(keys) ? keys : [keys]).map(key => obj[key]));
// chara: (str / [ary]) => fn => obj => *
const apply = (fn, ary) => fn(...ary);
// fn => ary => *
const kariN = pipeline([2, 0], R.uncurryN, R.curry);
// int => fn => fn
const gather = (...a) => a;
// spipe: ary => ... => arg => fn
