const underscore = v => new Proxy(v, {
  get: (f, key) => {
    console.log(`Getting ${key}`);
    console.log('The previous function is');
    console.log(f);
    const argsGetter = (...kargs) => {
      const objReceiver = (obj) => {
        console.warn('Recieved an object instead!');
        console.log(obj);
        console.info('Sending it down the function chain');
        let nobj;
        if (f.flag) {
          console.error("Yikes it's without a function call");
          nobj = f(f.flag, obj);
        } else {
          nobj = f(obj);
        }
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
      };
      if (kargs[0] === argsGetter.flag) {
        const obj = kargs[1];
        console.error(`Woah woah! Skipped the function call on ${key}`);
        console.warn('The object is');
        console.log(obj);
        return objReceiver(obj);
      }
      return underscore(objReceiver);
      // This function takes arguments for the method
    };
    argsGetter.flag = [];
    return underscore(argsGetter);
    // return a proxied function
  },
});
const identity = v => v;
const _ = underscore(identity);
