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
const curry = f => (...a) => {
  a.length === f.length && !a.includes(curry.__)
    ? f(...a)
    : (m => m(m))(m => r => (...a) => (s => (s.length === f.length ? f(...s) : m(s)))(
      r.map(v => (v === curry.__ ? a.shift() : v).concat(a)))
    )(a)
}
// NEW contentDocument

const P = {};
P.curry=(f,l='length')=>(...a)=>(a[l]===f[l]&&!a.includes(P._))?f(...a):(m=>m(m))(m=>r=>(...a)=>(s=>s[l]===f[l]?f(...s):m(s))(r.map(v=>v===P._?a.shift():v).concat(a)))(a),
// curry: fn => (...*) => *
// I mean, really. Figure this one out. It's not hard
// Array
Object.assign(P,{
  remap:P.curry((f,m)=>(...a)=>a.reduce((A,v,i)=>(A[m[i]]=v,A),[]),
  flip:(f)=>(...a)
  apply:P.curry((f,a)=>f(...a)),
  // apply: fn => ary => *
  gather:(...a)=>a,
  // gather: (...*) => ary
});
// Flow
Object.assign(P,{
  _: [],
  pipec:(_=>_=((P,A=Array.isArray)=>(...f)=>(...a)=>f.reduce((b,w)=>(A(w)?w.map(v=>(A(v)?_(...v)(...b):P(b,v))):[P(b,w)]),a)[0])((a,v)=>(~~v==v?a[v]:v(...a))))(),
  // pipec: (...*) => (...*) => *
  // pipec is the (c)omplicated pipe system that Marcus and Cole made
  pipeline:(a,...f)=>(...A) =>f.reduce((b,F,i)=>[[F(...b[0].concat(b[1].slice(0,a[i])))],b[1].slice(a[i])],[[],A])[0][0],
  // pipeline: ary => (...fn) => (...*) => *
  // pipeline is the precursor to pipec. It consumes the arguments that are inputed
  pike:(n, f, m) => (...a) => {
    const l = Array(n).fill(0).map((v, i) => a[i]).concat(f);
    l.slice(n).forEach((fn, i) => {
      const ri = i + n;
      const A = Array.isArray(m[i]) ? m[i] : [m[i]];
      l[ri] = fn(...A.map((indx) => l[indx]));
    });
    return l[l.length - 1];
  },
});


const inc = a => a + 1;
const mtp = (a, b) => a * b;
const exp = (a, b) => a ** b;
const x = P.pike(2, [inc, mtp], [0, [1, 2]]);
pike: (n, f, m) => (...a) => {
  const l = Array(n).fill(0).map((v, i) => a[i]).concat(f);
  l.slice(n).forEach((fn, i) => {
    const ri = i + n;
    const A = Array.isArray(m[i]) ? m[i] : [m[i]];
    l[ri] = fn(...A.map(indx => l[indx]));
  });
  return l[l.length - 1];
},
