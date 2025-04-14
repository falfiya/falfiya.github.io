const selfApply = <a, x extends (x: x) => a>(x: x) => x(x);

selfApply(x => x);
