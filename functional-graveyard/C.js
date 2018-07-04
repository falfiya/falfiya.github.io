const C = {
  __: ['Placeholder'],
};
C.curry = (fn) => {
  const argnames = fn.toString().match(/([.\w]+,*\s*)+/)[0].split`,`.map(v => v.replace(/\s/, ''));
  console.log(argnames);
  // Gets the parameter names from the provided function
  /*
  const len = argnames.length;
  // How many arguments the function takes
  // Allows interchange between method chaining and normal function calls
  const mayberun = (argso) => {
    if (args.length === len) {
      // if there are enough arguments
      return fn.apply(0, args.concat(rest));
      // run the function with the arguments and the rest arguments
    }
    return obj;
  };
  // checks each time wether or not the provided function should be run
  argnames.forEach((argname, idx) => {
    let a = argname;
    if (argname[0] === '.') {
      // if it's a gather
      a = argname.slice(3);
      // Slice off the "..."
      Object.defineProperty(obj, a, {
        value: (...a) => {
          rest = a;
          // there's only one gather allowed per arrow function
          // it's okay to set rest with "="
          return mayberun(argname);
        },
      });
    } else {
      Object.defineProperty(obj, a, {
        value: (a) => {
          args[idx] = a;
          return mayberun(argname);
        },
      });
    }
    obj[a].displayName = argname;
    // Make it nice and easy to debug
  });
  return obj;
  */
};
C.class = C.curry((name, proto) => {
  const classInstance = function (...args) {
    if (!(this instanceof classInstance)) {
      // if the classInstance is not being called with new
      const cI = new classInstance(...args);
      Object.setPrototypeOf(cI, proto);
      // Add stuff onto the prototype chain
      return cI;
      // this return blocks all further code
    }
    if (proto.hasOwnProperty('constructor')) {
      // if there's a constructor in proto we want to run it
      proto.constructor.apply(this, args);
    }
  };
  classInstance.prototype = proto;
  // make instanceof work properly
  classInstance.displayName = name;
  // make debug nice
  classInstance.extend = (nam, nproto) => C.class(nam, Object.setPrototypeOf(nproto, proto));
  // extend: str => obj => fn
  classInstance.static = obj => Object.assign(classInstance, obj);
  // static: obj => obj
  // assign some properties to the classInstance
  return classInstance;
});
C.class.displayName = 'class';
// class: str => obj => fn
