function cc(obj, fn) {
  if (fn) {
    return fn.bind(obj);
  }
  return new Proxy(obj, {
    get(o, k) {
      return o[k].bind(o);
    },
  });
}