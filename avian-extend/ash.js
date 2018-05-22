// ash is because the ash character is ae and this is avian-extend
// newFn.name = arg name || fn.name
// The name of the function is for the code to understand
// newFn.displayName = arg displayName || arg name || newFn.name
// The displayName is only for the user

const A = v => new Proxy(v, A._getHandler(A.type(v)));
A.$ = Symbol('Blank');
A.__ = Symbol('Placeholder');
A._argnames = fn => fn[Symbol.for('argnames')] || fn.toString().match(/([.\w]+,*\s*)+/)[0].split`,`.map(v => v.replace(/\s/, ''));
A._arity = (n, fn) => {
  if (!Number.isInteger(n) || !(Math.sign(n) + 1)) {
    throw new Error(`The first argument to _arity must be a non-negative integer instead of ${n}!`);
    // I mean, why would you want negative arguments amirite
  }
  Object.defineProperty(fn, 'length', { value: n, writable: false });
  return fn;
};
A._annotateFn = (fn, options) => {
  if (typeof fn !== 'function') {
    throw new Error('To annotate a function, you need a function');
    // I mean really. It's in the name
  }
  const o = Object.assign({
    arity: fn.length,
    name: fn.name,
    autoName: true,
    valueTypesOnly: false,
    showCounter: false,
    names: [],
    values: [],
  }, options);
  const displayArgs = [];
  o.values.forEach((v, i) => {
    let val;
    const type = A.type(v);
    if (v === A.__) {
      val = '__';
    } else if (v === A.$) {
      val = '$';
    } else if (!o.valueTypesOnly && type === 'number') {
      val = `${v}`;
    } else if (!o.valueTypesOnly && type === 'string') {
      val = `'${v.replace(/'/g, "\\'")}'`;
    } else {
      val = ({
        number: '#',
        string: "''",
        object: '{}',
        array: '[]',
        symbol: 'sym',
        boolean: 'bool',
        // haha get it? Symbool?
      })[type];
    }
    displayArgs[i] = val;
  });
  if (o.autoName && !o.names.length) {
    // if argument names are provided, it's implied that it's not automatic
    o.names = A._argnames(fn);
  }
  o.names.forEach((v, i) => displayArgs[i] = `${displayArgs[i] || ''}:${v}`);
  let counter = '';
  if (o.showCounter) {
    counter = `, @ ${o.values.filter(v => v !== A.__).length} / ${o.arity}`;
  }
  const newFn = A._arity(o.arity, fn);
  A._setFnName(newFn, o.name);
  // just to make sure
  if (displayArgs.length && o.showCounter) {
    newFn.displayName = `${o.name}(${displayArgs.join(', ')}${counter})`;
  } else {
    newFn.displayName = o.name;
  }
  newFn[Symbol.for('values')] = o.values;
  newFn[Symbol.for('argnames')] = o.names;
  return newFn;
  // set the .length property of the function and return it
};
A._curryN = (n, fn, name, argnames = [], o = {}) => {
  name === undefined && (name = fn ? fn.name : '');
  const aO = Object.assign({
    name,
    arity: n,
    showCounter: true,
    autoName: true,
    names: argnames,
  }, o);
  if (n === 0) {
    aO.showCounter = false;
    aO.autoName = false;
    aO.name = name;
    // It's okay to directy assign to aO here because we return right afterwards
    return A._annotateFn(fn, aO);
  }
  if (n > 30) {
    throw new Error(`${n} is a pretty big number. Are you sure you wanted to do that?`);
  }
  if (A.type(fn) !== 'function') {
    throw new Error('The second argument to _curryN must be a function!');
  }
  function prepare(previousArguments = Array(n).fill(A.__)) {
    const len = previousArguments.slice(0, n).filter(v => v !== A.__).length;
    // number of arguments recieved for non-optional argument values
    const mari = (...a) => {
      let c = 0;
      // a counter variable
      const args = previousArguments.map(v => v === A.__ && c < a.length ? a[c++] : v).concat(a.slice(c));
      // the old and new combined
      return prepare(args);
      // recurse
    };
    if (len === n) {
      previousArguments.forEach((v, i) => v === A.$ && delete previousArguments[i]);
      // remove the blanks
      return fn(...previousArguments);
      // run the function
    }
    // otherwise just annotate the function and return it
    mari[Symbol.for('argnames')] = A._argnames(fn);
    // make sure that the function annotator gets the right argument names
    const newFn = A._annotateFn(mari, Object.assign(aO, { values: previousArguments }));
    newFn[Symbol('isCurried')] = true;
    return newFn;
    // and return it
  }
  return prepare();
};
A._invokerN = (n, str, obj, types) => A._curryN(n, obj[str], str, types, obj);
A._propsy = v => new Proxy(v, {
  get: (f, key) => {
    const argsGetter = (...kargs) => {
      const objReceiver = (obj) => {
        let nobj;
        if (f.flag) {
          nobj = f(f.flag, obj);
        } else {
          nobj = f(obj);
        }
        const value = nobj[key];
        if (typeof value === 'function') {
          return nobj[key](...kargs);
        }
        return value;
      };
      if (kargs[0] === argsGetter.flag) {
        const obj = kargs[1];
        return objReceiver(obj);
      }
      return A._propsy(objReceiver);
    };
    argsGetter.flag = [];
    return A._propsy(argsGetter);
  },
});
A._setFnName = (fn, name) => Object.defineProperty(fn, 'name', { value: name });
A.type = (v) => {
  const t = typeof v;
  switch (t) {
    case 'number': return Number.isNaN(v) ? 'NaN' : t;
    case 'object': return Array.isArray(v) ? 'array' : v ? 'object' : 'null';
    default: return t;
  }
};
A._ = A._propsy(v => v);
A.curryN = A._curryN(2, A._curryN, 'curryN');
A.curry = A._curryN(1, (...a) => A._curryN(a[0].length, ...a), 'curry', ['fn']);
// The name is optional so no need to curry
A.uncurryN = A._curryN(2, (n, fn) => A._arity(n, (...args) => {
  let argpos = 0;
  let fnp = fn;
  while (argpos !== n) {
    const len = fnp.length + argpos;
    fnp = fnp(...args.slice(argpos, len));
    argpos = len;
  }
  return fnp;
}), 'uncurryN');
A.kariN = A._curryN(2, (n, fn) => A.curry(A.uncurryN(n, fn)), 'kariN');
A.arity = A._curryN(2, A._arity, 'arity');
A.nAry = A._curryN(2, (n, fn) => (...b) => A.arity(n, fn)(...b.slice(0, n)), 'nAry');
A.pipe = (...fns) => v => fns.reduce((a, fn) => fn(v), v);
// Helper functions
A.add = A.curry((a, b) => a + b, 'add', ['int', 'int']);
A.subtract = A.curry((a, b) => a - b, 'subtract', ['int', 'int']);
A.multiply = A.curry((a, b) => a * b, 'multiply', ['int', 'int']);
A.divide = A.curry((a, b) => a / b, 'divide', ['int', 'int']);

// Look, verbs are hard. Come up with your own.
A._String = {
  mince() {
    return this.split``;
  },
  reverse() {
    return this.mince().reverse().join``;
  },
  diceNoRemainder(n) {
    return this.match(new RegExp(`[\\s\\S]{${n}}`, 'g'));
  },
  dice(n) {
    let d = this.diceNoRemainder(n);
    const xs = -this.length % n;
    if (xs) {
      d = d.shove(this.slice(xs));
    }
    return d;
  },
  prefix(v, l) {
    const count = l - this.length;
    return `${v}`.repeat(count > 0 && count).concat(this);
  },
  every: Array.prototype.every,
  filter: Array.prototype.filter,
  find: Array.prototype.find,
  forEach: Array.prototype.forEach,
  includes: Array.prototype.includes,
  map: Array.prototype.map,
  reduce: Array.prototype.reduce,
};
A._Array = {
  // Pure
  copy() {
    return this.slice();
  },
  shove(...args) {
    const ary = this.copy().push(...args);
    return ary;
  },
  removeIndex(i) {
    return this.copy().mRemoveIndex(i);
  },
  snap(n) {
    return this.copy().pop(n);
  },
  pureReverse() {
    return this.copy().reverse();
  },
  pureSplice(...args) {
    return this.copy().splice(...args);
  },
};
A._Object = {
  copy() {
    return Object.assign({}, this);
  },
  keysArray() {
    return Object.keys(this);
  },
  identity() {
    return this;
  },
  forEachKeys(fn) {
    this.keysArray().forEach(fn);
    return this;
  },
  mapKeys(fn) {
    return this.keysArray().map(fn);
  },
  map(fn) {
    const temp = {};
    this.forEach((v, k) => temp[k] = fn(v, k, this));
    return temp;
  },
  forEach(fn) {
    this.keysArray().forEach((k, i) => fn(this[k], k, this));
  },
  reduce(fn, acc) {
    this.forEach((v, i, a) => acc = fn(acc, v, i, a));
    return acc;
  },
  count(fn) {
    return this.filter(fn).length;
  },
};
A._Number = {
  times(fn) {
    return Array(+this).fill(0).map((v, i) => fn(i));
  },
};
A._ArrayLike = {
  last() {
    return this[this.length - 1];
  },
  remove(i) {
    return this.mince().removeIndex(i).join``;
  },
  random() {
    return this[Math.round(Math.random() * this.length)];
  },
  rend(n) {
    return [this.slice(0, n), this.slice(n)];
  },
};
Object.keys(A._ArrayLike).forEach(key => Object.defineProperty(String.prototype, key, { value: A._ArrayLike[key] }));
Object.keys(A._ArrayLike).forEach(key => Object.defineProperty(Array.prototype, key, { value: A._ArrayLike[key] }));
Object.keys(A._String).forEach(key => Object.defineProperty(String.prototype, key, { value: A._String[key] }));
Object.keys(A._Array).forEach(key => Object.defineProperty(Array.prototype, key, { value: A._Array[key] }));
Object.keys(A._Number).forEach(key => Object.defineProperty(Number.prototype, key, { value: A._Number[key] }));
Object.keys(A._Object).forEach(key => Object.defineProperty(Object.prototype, key, { value: A._String[key] }));
