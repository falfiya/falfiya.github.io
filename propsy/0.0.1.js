const _ = v => new Proxy(v, {
  get: (f, key) => {
    console.log(`Getting ${key}`);
    console.log('The previous function is');
    console.log(f);
    return (...kargs) =>
      // This function takes arguments for the method
      _((obj) => {
        console.warn('Recieved an object instead!');
        console.log(obj);
        console.info('Sending it down the function chain');
        const nobj = f(obj);
        console.info('The new object is');
        console.log(nobj);
        const value = nobj[key];
        console.log('The value accessed is');
        console.log(value);
        if (typeof value === 'function') {
          console.log("It's a function!");
          return nobj[key](...kargs);
        }
        console.log('Boring, just a property');
        return value;
      });
    // return a proxied function
  },
});
const identity = v => v;
const __ = _(identity);
const sum = (a, b) => a + b;
