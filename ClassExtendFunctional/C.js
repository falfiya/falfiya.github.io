// instanceof and C.js don't get along
const C = {};
C.curry = (fn) => {
  const argnames = fn.toString().match(/([.\w]+,*\s*)+/)[0].split`,`.map(v => v.replace(/\s/, ''));
  // Marcus code
  const len = argnames.length;
  const args = [];
  let rest = [];
  let rcvd = 0;
  const obj = function (...args) {
    return fn(...args);
  };
  // Now you can call it normally
  const mayberun = (argname) => {
    if ((obj.__length__ = ++rcvd) === len) {
      return fn.apply(0, args.concat(rest));
    }
    return obj;
  };
  argnames.forEach((argname, idx) => {
    let a = argname;
    if (argname[0] === '.') {
      // if it's a gather
      a = argname.slice(3);
      // Slice off the "..."
      Object.defineProperty(obj, a, {
        value: (...a) => {
          rest = a;
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
  });
  return obj;
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
      proto.constructor.apply(this, args);
    }
  };
  classInstance.displayName = name;
  // assign some properties to the classInstance
  classInstance.extend = (nam, nproto) => C.class(nam, Object.setPrototypeOf(nproto, proto));
  classInstance.static = obj => Object.assign(classInstance, obj);
  return classInstance;
});
const Animal = C.class('Animal', {
  constructor(a, b) {
    this.v = a + b;
  },
  speak(str) {
    console.log(str);
  },
});
const Cat = Animal.extend('Cat', {
  meow() {
    this.speak('Meow!');
  },
});
const Human = C.class.name('Human')
  .proto({
    isStupid: true,
    constructor(iq) {
      if (iq > 300) {
        this.inStupid = false;
      }
    },
    icceAnother() {
      console.log('Someone got icced');
      return this;
    },
  });
