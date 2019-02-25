const pipeAry = R.apply(R.pipe),
  selectArgs = (...fns) => (...args) => fns.map(fnary => R.pipe(fnary[0], fnary[1])(args));

pipelineN(3, []);
