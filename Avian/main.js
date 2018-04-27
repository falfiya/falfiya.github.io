const A = (v) => {
  A.typeof(v);
};
Object.assign(A, {
  __: ['Placeholder'],
  arity(n, fn, N) {
    const f = function (...a) { return fn.apply(this, a.slice(0, n)); };
    Object.defineProperty(f, 'length', { value: n, writable: false });
    f.displayName = N || fn.displayName || fn.name;
    return f;
  },
  _curryN(n, fn) {
    if (A.type(n) !== 'number' || !(Math.sign(n) + 1)) {
      throw new Error('The first argument to _curryN must be a non-negative number!');
    }
    if (A.type(fn) !== 'function') {
      throw new Error('The second argument to _curryN must be a function!');
    }
    function prepare(previousArguments = Array(n).fill(A.__)) {
      const len = previousArguments.slice(0, n).filter(v => v !== A.__).length;
      // number of arguments recieved
      return (len === n) ? fn(...previousArguments) : A.arity(n - len, (...newArguments) => {
        let c = 0;
        // a counter variable
        const args = previousArguments.map(v => v === A.__ && c < newArguments.length ? newArguments[c++] : v).concat(newArguments.slice(n));
        // the old and new combined
        return prepare(args);
      }, `curried_${fn.displayName || fn.name || 'fn'}_at_${len}_out_of_${n}`);
    }
    return prepare();
  },
  type: (v) => {
    const t = typeof v;
    switch (t) {
      case 'number': return Number.isNaN(v) ? 'NaN' : t;
      case 'object': return Array.isArray(v) ? 'array' : v ? 'object' : 'null';
      default: return t;
    }
  },
});
A.curryN = A._curryN(2, A._curryN);
A.curry = fn => A._curryN(fn.length, fn);
const add = (a, b) => a + b;
const mtp = (a, b) => a * b;
const exp = (a, b) => a ** b;
const x = A.curry(exp);
