const A = v => new Proxy(v, A._getHandler(A.type(v)));
A._getFnName = fn => fn.displayName || fn.name;
A._getHandler = t => ({
  get(o, k) {
    if (k === 'a') {
      return new Proxy(A[t], {
        get(typefns, fn) {
          if (typefns === 'A') {
            return o;
          }
          const fnr = typefns[fn];
          return A.arity(fnr.length, (...a) => fnr(o, ...a), fn);
        },
      });
    }
    return o[k];
  },
});
A._ = ['Blank'];
A.__ = ['Placeholder'];
A._isPlaceholder = v => v === A.__;
A._arity = (n, fn, name) => {
  const f = function (...a) { return fn.apply(this, a); };
  Object.defineProperty(f, 'length', { value: n, writable: false });
  f.displayName = name || A._getFnName(fn);
  return f;
};
A._curryN = (n, fn, name) => {
  if (!Number.isInteger(n) || !(Math.sign(n) + 1)) {
    throw new Error(`The first argument to _curryN must be a non-negative integer!${n}`);
  } else if (n > 1000) {
    throw new Error(`${n} is a pretty big number. Are you sure you wanted to do that?`);
  }
  if (A.type(fn) !== 'function') {
    throw new Error('The second argument to _curryN must be a function!');
  }
  function prepare(previousArguments = Array(n).fill(A.__)) {
    const p = previousArguments.map((v) => {
      let type = A._isPlaceholder(v) ? 'A.__' : A.type(v);
      if (v === A._) {
        type = '';
      } else if (type === 'number') {
        type = v;
      } else if (type === 'string') {
        type = `'${v.replace(/'/g, "\\'")}'`;
      }
      return type;
    }).join(', ');
    const len = previousArguments.slice(0, n).filter(v => v !== A.__).length;
    const tlen = previousArguments.filter(v => v !== A.__).length;
    // number of arguments recieved for non-optional argument values
    const afn = A._arity(n - len, (...newArguments) => {
      if (!newArguments.length) {
        newArguments.push(A._);
      }
      let c = 0;
      // a counter variable
      const args = previousArguments.map(v => v === A.__ && c < newArguments.length ? newArguments[c++] : v).concat(newArguments.slice(c));
      // the old and new combined
      return prepare(args);
    }, `${name || A._getFnName(fn)}(${p} : ${tlen} / ${n})`);
    afn.previousArguments = previousArguments;
    return (len === n) ? (previousArguments.forEach((v, i) => v === A._ && delete previousArguments[i]), fn(...previousArguments)) : afn;
  }
  return prepare();
};
A.type = (v) => {
  const t = typeof v;
  switch (t) {
    case 'number': return Number.isNaN(v) ? 'NaN' : t;
    case 'object': return Array.isArray(v) ? 'array' : v ? 'object' : 'null';
    default: return t;
  }
};
A.curryN = A._curryN(2, (n, fn, name) => A._curryN(n, fn, name), 'curryN');
A.curry = (fn, name) => A._curryN(fn.length, fn, name);
// The name is optional so no need to curry
A.uncurryN = (n, fn) => A._arity(n, (...args) => {
  let argpos = 0;
  let fnp = fn;
  while (argpos !== n) {
    const len = fnp.length + argpos;
    fnp = fnp(...args.slice(argpos, len));
    argpos = len;
  }
  return fnp;
}, A._getFnName(fn));
A.kariN = A.curry((n, fn) => A.curry(A.uncurryN(n, fn)));
A.arity = A.curry(A._arity);
A.nAry = A.curry((n, fn, name) => (...b) => A.arity(n, fn, name)(...b.slice(0, n)), 'nAry');
A.pipe = (...fns) => v => fns.reduce((a, fn) => fn(v), v);
A.array = {
  keys: A.curry(ary => Object.keys(ary), 'keys'),
};
const sum = (a, b) => c => (d, e) => a + b + c + d + e;
const x = A.kariN(5, sum);
