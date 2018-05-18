const pipeline = (ary, ...fns) => (...args) => {
  return Array.from(args).reduce((a, v, idx) => {
    console.warn(`Function ${idx}`);
    const argpos = a[0];
    console.warn(`The argpos is ${argpos}`);
    const passedArgs = a[1];
    console.warn('The passed args are');
    console.log(passedArgs);
    const argcount = ary[idx];
    console.warn(`The argcount for function ${idx} is ${argcount}`);
    const fn = fns[idx];
    console.warn('The function args are');
    const fnargs = passedArgs.concat(args.slice(argpos, argcount + argpos))
    console.log(fnargs);
    return [argpos + argcount, [R.apply(fn, fnargs)]];
  }, [0, []])[1][0];
};
const log = (...a) => a;

let x = pipeline([1, 1], R.multiply, log);
x(2, 3);