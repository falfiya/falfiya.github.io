const R = require('ramda');
// The best obfuscation

const kari = R.pipe(R.uncurryN, R.curry);
const list = R.unapply(R.identity);
// (*) -> ary
// list from args
const mapIndexed = R.addIndex(R.map);
// (fn) -> (ary) -> ary
// it's an indexed map
const reverseSubArrays = R.map(R.reverse);
// (ary) -> ary
// reverses arrays that are in an array
const spread = R.curry((fn, lst) => fn(...lst));
// (fn) -> (ary) -> fn()
// applies arguments to a function
const pattern = R.curry((mod, lst) => mod.map(int => lst[int]));
const split = (idx, ary) => [ary.slice(0, n), ary.slice(n)];
// (ary) -> (ary) -> ary
// takes a modifier array any an array to apply the key modifications to
const keyToVal = R.pipe(R.toPairs, reverseSubArrays, R.fromPairs);
// (obj) -> obj
// reverses keys and values; use with caution
const fi = cond => R.compose(R.always, cond);
// (fn) -> (*) -> fn -> bool
// takes a condition function and returns a function who's output is a function that returns a bool
const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat);
// (fn) -> (int) -> (*) -> *
// returns a function that applies a given function n times
const whenWhen = R.curry((cond, val0, fn, val1) => R.when(fi(cond, val0), fn)(val1));
// (fn) -> (*) -> (fn) -> (*) -> *
// when val0 abides by a condition, apply fn to val1, else, return val1 unchanged
const twice = fn0 => fn1 => R.converge(fn0, [R.identity, fn1]);
// λa::fn.λb::fn.λc::*.a(c)(b(c))
// This is actually super useful
const toSome = fn => R.compose(R.map(fn), R.pick);
// λa::ary.λb::obj.λc::fn.obj
const invoke = fn => fn();
