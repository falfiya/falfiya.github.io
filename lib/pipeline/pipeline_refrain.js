const log = (...a) => a;
const pipeline = (ary, ...fns) => (...args) => {
  let argsLeft = Array.from(args);
  let nextFnArgs = [];
  for (let idx = 0; idx < ary.length; ++ idx) {
    const count = ary[idx];
    const fn = fns[idx];
    console.warn(`Getting args for function ${idx}`);
    const args = nextFnArgs.concat(argsLeft.slice(0, count))
    console.log(args);
    const appliedFn = R.apply(fn, args);
    console.warn('The applied fn is')
    console.log(appliedFn);
    argsLeft = argsLeft.slice(count);
    console.warn('After getting args, args left is');
    console.log(argsLeft);
    nextFnArgs = [appliedFn];
  }
  return nextFnArgs[0];
};
let x = pipeline([1, 1], R.multiply, log);
x(2, 3);