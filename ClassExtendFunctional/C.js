// instanceof and C.js don't get along
const C = {};
C.class = (name, proto) => {
  const classInstance = function (...args) {
    if (!(this instanceof classInstance)) {
      // if the classInstance is not being called with new
      return new classInstance(...args);
      // this return blocks all further code
    }
    if (proto.hasOwnProperty('constructor')) {
      proto.constructor.apply(this, args);
    }
  };
  Object.setPrototypeOf(classInstance, proto);
  // when new is called on the classInstance it adds
  // the prototype object to the prototype chain above
  classInstance.displayName = name;
  // assign some properties to the classInstance
  classInstance.extend = (name, nproto) => Class(name, Object.setPrototypeOf(nproto, proto));
  classInstance.static = obj => Object.assign(classInstance, obj);
  return classInstance;
};
// Class: obj => fn => fn => obj
C.curry = (fn) => {
  const argnames = fn.toString().match(/([.\w]+,*\s*)+/g)[0].split`,`.map(v => v.replace(/\s/, ''));
  // Marcus code
  const len = argnames.length;
  const args = [];
  let rest = [];
  let rcvd = 0;
  const obj = {};
  const mayberun = (argname) => {
    if (++rcvd === len) {
      return fn.apply(0, args.concat(rest));
    }
    delete obj[argname];
    return obj;
  };
  argnames.forEach((argname, idx) => {
    if (argname[0] === '.') {
      // if it's a gather
      obj[argname.slice(3)] = (...a) => {
        rest = a;
        return mayberun(argname);
      };
    } else {
      obj[argname] = (a) => {
        args[idx] = a;
        return mayberun(argname);
      };
    }
    obj[argname].displayName = argname;
  });
  return obj;
};
