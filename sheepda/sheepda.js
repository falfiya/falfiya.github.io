const P = {
  _: [],
  curryN: (n, f, l = 'length') => (...a) => (a[l] === n && !a.includes(P._)) ? f(...a) : (m => m(m))(m => r => (...a) => (s => s[l] === n ? f(...s) : m(s))(r.map(v => v === P._ ? a.shift() : v).concat(a)))(a),
  curry: (f, l = 'length') => (...a) => (a[l] === f[l] && !a.includes(P._)) ? f(...a) : (m => m(m))(m => r => (...a) => (s => s[l] === f[l] ? f(...s) : m(s))(r.map(v => v === P._ ? a.shift() : v).concat(a)))(a),
  // curry: fn => (...*) => *
  // I mean, really. Figure this one out. It's not hard
};

// Array
Object.assign(P, {
  remap: P.curry((m, a) => a.reduce((A, v, i, an) => (A[m[i]] = v, A), [])),
  apply: P.curry((f, a) => f(...a)),
  // apply: fn => ary => *
  gather: (...a) => a,
  // gather: (...*) => ary
});
// Flow
Object.assign(P, {
  _: [],
  pipec: (_ => _ = ((P, A = Array.isArray) => (...f) => (...a) => f.reduce((b, w) => (A(w) ? w.map(v => (A(v) ? _(...v)(...b) : P(b, v))) : [P(b, w)]), a)[0])((a, v) => (~~v == v ? a[v] : v(...a))))(),
  // pipec: (...*) => (...*) => *
  // pipec is the (c)omplicated pipe system that Marcus and Cole made
  pipeline: (a, ...f) => (...A) => f.reduce((b, F, i) => [[F(...b[0].concat(b[1].slice(0, a[i])))], b[1].slice(a[i])], [[], A])[0][0],
  // pipeline: ary => (...fn) => (...*) => *
  // pipeline is the precursor to pipec. It consumes the arguments that are inputed
  pike: (n, f, m, l, r, A) => (...a) => (l = Array(n).fill(0).map((v, i) => a[i]).concat(f), l.slice(n).forEach((F, i) => (r = i + n, A = Array.isArray(m[i]) ? m[i] : [m[i]], l[ri] = F(...A.map(indx => l[indx])))), l[l.length - 1]),
  flip: f => (...a) => a,
});
const inc = a => a + 1;
const mtp = (a, b) => a * b;
const exp = (a, b) => a ** b;
const x = P.pike(2, [inc, mtp], [0, [1, 2]]);
