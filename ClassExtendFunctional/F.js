const F = {};
F.arity = (n, fn) => {
  const f = function () { return fn.apply(this, arguments); };
  Object.defineProperty(f, 'length', { value: n, writable: false });
  f.displayName = fn.displayName || fn.name;
};
F.curry = ;
