function pipelineN(ary, ...fns) {
  return (...args) => fns.reduce((acc, val) => {
    let temp = val[1];
    let argsHere = [];
    if (acc) {
      argsHere.push(acc);
    }
    if (val[0] !== null) {
      if (typeof val[0] === 'number') {
        argsHere.push(args[val[0]]);
      } else if (typeof val[0] === 'function') {
        argsHere.push(val[0](args));
      } else {
        throw new Error('val[0] must be a number or a function');
      }
      temp = val[1](...argsHere);
    }
    return temp;
  });
}
pipelineN(2, [0, a=>_=>alert(a)], [1, setTimeout.bind(window)])('a', 200);

function pipelineN(ary, ...fns) {
  return (...args) => {
    let acc = fns[0];
    ary.forEach((argCount, idx) => {
      if (argCount !== 0) {
        acc(...args.slice(0, argCount));
        args = args.slice(argCount);
      }
      if (idx < fns.length - 1) {
        acc = (fns[idx + 1])(acc);
      }
    });
    return acc;
  };
}
function get(k, o) {
  return [o[k]];
}

const pipeAry = R.apply(R.pipe);