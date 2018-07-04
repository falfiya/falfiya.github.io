const newDOMLikeProxy = DOM => new Proxy(DOM, {
  get(o, k) {
    let r = null;
    const b = cc(o);
    switch (k) {
      case 'id':
        r = b.getElementById;
        break;
      case 'qs':
        r = b.querySelector;
        break;
      case 'qsa':
        r = b.querySelectorAll;
        break;
      case 'ready':
        r = fn => b.addEventListener('DOMContentLoaded', fn);
        break;
      default: r = o[k];
    }
    return r;
  },
  set(o, k, v) {
    if (k.slice(0, 2) === 'on') {
      o.addEventListener(k.slice(2), v);
    }
  },
});
const d = newDOMLikeProxy(document);
