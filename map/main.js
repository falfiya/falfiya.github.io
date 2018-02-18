// Author: Cole Gannon / Falfa
// I really like how I wrote this and I'm proud of it
// Helper functions
const dot = R.curry((str, obj) => str.split`.`.reduce((acc, val) => acc[val], obj));
const wrap = R.curry((fn, arg) => () => fn(arg));
const ignore = () => undefined;
const invoke = R.curry((prop, args, obj) => obj[prop].bind(obj)(args));
// str => * => obj
const list = R.unapply(R.identity);
const kariN = R.pipe(R.uncurryN, R.curry);
const logArgs = (...args) => console.log(args);
const log = (arg) => {
  console.log(arg);
  return arg;
};
// Flow
const split = (...fns) => (...args) => ary.map(fn => fn(arg));
const mergeTwo = (fn0, fn1) => R.converge(fn1, [R.identity, fn0]);

// Logic
const replaceNullWithOne = R.when(R.equals(null), R.always(1));

// Props
const toString = R.invoker(0, 'toString');
// * => str
const append = R.flip(R.concat);
// str => str
const sliceFrom0to = R.slice(0);
// str => str
const splitBy = R.split;
// str => ary
const joinBy = R.join;
// ary => str
const divideBy = R.flip(R.divide);
// * => #
const multiplyBy = R.flip(R.multiply);
// * => #

// API
const geti = invoke('getElementById');
// id => DOM => el
const getiFrom = R.flip(geti);
// DOM => id => el
const interval = R.curry(setInterval);
// fn => ms
const setIntervalWithArgument = (fn, arg, ms) => setInterval(wrap(fn, arg), ms);
// fn => arg => ms => #
const setElementInnerText = R.curry((el, str) => { el.innerText = str ;});
// el => str => str

const getMapFrom = geti('map');
// DOM => el

// Dim & Undim
{
  const num = 1.8;
  var elOpacity = R.pipe(invoke('getAttribute', 'fill-opacity'), replaceNullWithOne);
  // el => #
  const setElOpacity = R.flip(R.invoker(2, 'setAttribute')('fill-opacity'));
  // # => el => null
  const dimElement = mergeTwo(R.pipe(elOpacity, divideBy(num)), setElOpacity);
  // el => null
  const dimFirstChild = R.pipe(dot('firstChild'), dimElement);
  // el => null
  var mapGetiFrom = R.pipe(getMapFrom, dot('contentDocument'), getiFrom);
  // DOM => id => el
  var mapOverKeysOf = R.pipe(Object.keys, R.flip(invoke('map')));
  // fn => ary
  var dimMapElementsFrom = (DOM, data) => mapOverKeysOf(data)(R.pipe(mapGetiFrom(DOM), dimFirstChild));
  // DOM => data => null
  const undimElement = mergeTwo(R.pipe(elOpacity, multiplyBy(num)), setElOpacity);
  // el => null
  var dimTarget = R.pipe(dot('target'), dimElement);
  // event => null
  var undimTarget = R.pipe(dot('target'), undimElement);
  // event => null
}

// Time
{
  var getTimeElement = geti('ictime');
  // DOM => el
  const time = R.pipe(Date, splitBy(' '), sliceFrom0to(5), joinBy(' '));
  // null => str
  var setTimeInnerTextToTimeFrom = DOM => setElementInnerText(getTimeElement(DOM), time());
  // DOM => str => str
}
// Time Fontsize
{
  const fontDivisor = 16;
  const getWidth = R.pipe(window.getComputedStyle, R.prop('width'), sliceFrom0to(-2));
  // el => str
  const processWidth = R.pipe(getWidth, divideBy(fontDivisor), Math.round, toString, append('px'));
  // el => str
  const setFontSize = R.curry((el, str) => el.style.fontSize = str);
  // el => str => str
  var calibrateFontSize = R.pipe(getTimeElement, mergeTwo(processWidth, setFontSize));
  // DOM => null
}
// Event Listeners
{
  var listenMapFrom = R.curry((DOM, e, fn) => getMapFrom(DOM).contentDocument.addEventListener(e, fn));
  // DOM => str => fn
}
function asyncLoad() {
  const listenMap = listenMapFrom(document);
  dimMapElementsFrom(document, areaData);
  calibrateFontSize(document);
  window.addEventListener('resize', wrap(calibrateFontSize, document));
  setTimeInnerTextToTimeFrom(document);
  setIntervalWithArgument(setTimeInnerTextToTimeFrom, document, 999);
  listenMap('mouseover', undimTarget);
  listenMap('mouseout', dimTarget);
  // listenMap('mouseclick', )
}
window.addEventListener('load', asyncLoad);
