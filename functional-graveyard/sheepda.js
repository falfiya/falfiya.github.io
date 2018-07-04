const R = {
  __: [],
  _curryN: (n, f, m = (r, s) => (...a) => (s = r.map(v => v === R.__ ? a.shift() : v).concat(a)).length >= n ? f(...s.slice(0, n + 1)) : m(s)) => m([]),
  _arity(n, fn) {
    const f = function() { return fn.apply(this, arguments); };
    Object.defineProperty(f, 'length', {value: n});
  },
};
// curry: fn => (...*) => *
// I mean, really. Figure this one out. It's not hard
R.curryN = R._curryN(2, R._curryN);
// curryN: int => fn => (...*) => *
R.curry = f => R._curryN(f.length, f);
// curry: f => (...*) => *
R.uncurryN = R.curry((n, f) => R.curryN(n, (...a) => a.reduce((c, A) => c(A), f)));
// uncurry: fn => (...*) => *
R.flip = R.curry((f, a, b, ...c) => f(b, a, ...(c.length ? c : [R.__])));

R.pipe = (...f) => (...a) => f.reduce((c, F) => [F(...c)], a)[0];
R.invokerN = (n, s) => R.curryN(n, (...a) => a);
R.invokerN = R.flip(R.curryN);
// int => str => (...*) => obj => *
R.invoker = s => (...a) => o => o[s](...a);
// str => (...*) => obj => *
R.compose = R.pipe();
R.pipec = (_ => _ = ((P, A = Array.isArray) => (...f) => (...a) => f.reduce((b, w) => (A(w) ? w.map(v => (A(v) ? _(...v)(...b) : P(b, v))) : [P(b, w)]), a)[0])((a, v) => (~~v == v ? a[v] : v(...a))))();
// pipec: (...*) => (...*) => *
// pipec is the (c)omplicated pipe system that Marcus and Cole made
R.pipeline = (a, ...f) => (...A) => f.reduce((b, F, i) => [[F(...b[0].concat(b[1].slice(0, a[i])))], b[1].slice(a[i])], [[], A])[0][0];
// pipeline: ary => (...fn) => (...*) => *
// pipeline is the precursor to pipec. It consumes the arguments that are inputed
R.pike = (n, f, m) => (...a) => {
  const l = Array(n).fill(0).map((v, i) => a[i]).concat(f);
  l.slice(n).forEach((fn, i) => {
    const ri = i + n;
    const A = Array.isArray(m[i]) ? m[i] : [m[i]];
    l[ri] = fn(...A.map(indx => l[indx]));
  });
  return l[l.length - 1];
};
R.remap = R.curry((m, a) => a.reduce((A, v, i) => (A[m[i]] = v, A), []));
R.apply = R.curry((f, a) => f(...a));
R.gather = (...a) => a;
R.mari = R.curry((n, f) => R.curryN(n, R.uncurryN(n, f)));
// Flow
const inc = a => a + 1;
const mtp = R.curry((a, b) => a * b);
const exp = (a, b) => a ** b;
const add = a => b => c => d => a + b + c + d;
const add4 = R.mari(4, add);
const x = R.pipe(inc, mtp(2));
