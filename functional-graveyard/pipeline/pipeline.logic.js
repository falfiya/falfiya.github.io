const pipeline = (ary, ...fns) => (...args) => fns.reduce((a, v, idx) => {
  const argpos = a[0];
  const passedArgs = a[1];
  const argcount = ary[idx];
  const fn = fns[idx];
  if (argcount > 0) {
    const fnargs = passedArgs.concat(args.slice(argpos, argcount + argpos));
    return [argpos + argcount, [fn(...fnargs)]];
  }
  return [argpos, [fn]];
}, [0, []])[1][0];
x = pipeline([1, 1, 0], R.inc, R.multiply, console.log)
