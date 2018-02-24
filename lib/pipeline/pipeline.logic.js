const pipeline = (ary, ...fns) => (...args) => Array.from(args).reduce((a, v, idx) => {
  const argpos = a[0];
  const passedArgs = a[1];
  const argcount = ary[idx];
  const fn = fns[idx];
  if (argcount > 0) {
    const fnargs = passedArgs.concat(args.slice(argpos, argcount + argpos));
    return [argpos + argcount, [fn.apply(0, fnargs)]];
  }
  return [argpos, [fn]];
}, [0, []])[1][0];
