const underscore = v => new Proxy(v, {
  get: (f, key) =>
    (...kargs) =>
      underscore((obj) => {
        const nobj = f(obj);
        const value = nobj[key];
        if (typeof value === 'function') {
          return nobj[key](...kargs);
        }
        return value;
      })
  ,
});
const _ = underscore(v => v);
