const F = {};
F.arity = (n, fn) => {
  const f = function () { return fn.apply(this, arguments); };
  Object.defineProperty(f, 'length', { value: n, writable: false });
  f.displayName = fn.displayName || fn.name;
};
const getFnLength = str => str.replace(/ /g, '').match(/([a-z0-9(),]|=>)+/i)[0].replace(/=>[a-z0-9]*/i, '').match(/[a-z0-9]+/gi);
