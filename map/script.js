const mutate = R.curry((object, key, value) => object[key] = value);
const impure = fn => (...args) => {
  fn(...args);
  return args;
};
const impure1 = fn => (arg) => {
  fn(arg);
  return arg;
};
const log = impure1(console.log);
const list = R.unapply(R.identity);
const toAll = (...fns) => arg => fns.map(fn => fn(arg));
const runAll = (...fns) => fns.map(fn => fn());
const kariN = R.pipe(R.uncurryN, R.curry);
const fi = R.ifElse(R.__, R.__, R.identity);
const andAnd = R.curry((bool, fn) => (bool ? fn : R.identity));
const append = R.flip(R.concat);
const divideBy = R.flip(R.divide);
const multiplyBy = R.flip(R.multiply);
const splitBy = R.invoker(1, 'split');
const joinBy = R.invoker(1, 'join');
const toString = R.invoker(0, 'toString');
const sliceFrom0to = R.slice(0);
const wait = R.curry((fn, arg) => () => fn(arg));
// const waitFn = R.curry((fn, argfn) => () => fn(argfn()));
const dot = R.curry((s, o) => s.split`.`.reduce((a, v) => a[v], o));
const typeuv = (something) => {
  let type;
  if (something === null) {
    type = 'null';
  } else if (Array.isArray(something)) {
    type = 'array';
  } else if (Number.isNaN(something)) {
    type = 'NaN';
  } else {
    type = typeof something;
  }
  return type;
};
const setInnerHTMLOf = mutate(R.__, 'innerHTML');
const isObj = R.pipe(typeuv, R.equals('object'));
//    (element, str)

// Opacity Functions
const nullTo1 = R.ifElse(R.isNil, R.always(1), R.identity);
// replace null with one
const getOpacity = R.pipe(R.invoker(1, 'getAttribute')('fill-opacity'), nullTo1);
//    (element)
// get the opacity of an element
const setOpacity = R.flip(R.invoker(2, 'setAttribute')('fill-opacity'));
//    (element) => (string / number)
// set the opacity of an element
const applyFnToOpacity = fn => R.converge(setOpacity, [R.identity, R.pipe(getOpacity, fn)]);
// --End--

function init() {
  const elementIDs = [
    'map',
    'ictitle',
    'ictype',
    'icstaff',
    'icdescription',
    'ictime',
    'sic',
  ];
  const elements = {};
  const geti = id => document.getElementById(id);
  // get Elements
  elementIDs.forEach((id) => {
    elements[id] = geti(id);
  });
  const mapDOM = elements.map.contentDocument;
  const mapAEL = mapDOM.addEventListener.bind(mapDOM);
  const mapGeti = mapDOM.getElementById.bind(mapDOM);
  // mapDom helper functions
  const areaDataKeys = Object.keys(areaData);
  // get ids of every area
  const forEachAreaKey = R.forEach(R.__, areaDataKeys);
  // return a function that'll iterate over these
  const getFirstChild = R.pipe(R.prop('children'), R.prop(0));
  const mapGetChild = R.pipe(mapGeti, getFirstChild);
  // get the first child from an element with an id from the map
  // Dimming Functions
  const divisor = 1.7;
  const dim = impure(applyFnToOpacity(divideBy(divisor)));
  const undim = applyFnToOpacity(multiplyBy(divisor));
  const dimMapChild = R.pipe(mapGetChild, dim);
  // dim the above child
  forEachAreaKey(dimMapChild);
  // dim each child from the ids

  // event listeners
  const writeTitle = setInnerHTMLOf(elements.ictitle);
  const writeStaff = setInnerHTMLOf(elements.icstaff);
  const clearStaff = writeStaff('');
  const writeType = setInnerHTMLOf(elements.ictype);
  const writeDesc = setInnerHTMLOf(elements.icdescription);

  const dotTitle = R.prop('title');
  const dotType = R.prop('type');
  const dotDesc = R.prop('desc');
  const dotStaff = R.prop('staff');
  const dotln = R.prop('lastName');
  formatlns = R.pipe(R.map(dotln), joinBy(', '));
  formatStaffObj = R.pipe(R.prop('staff'), R.cond([
    [R.isNil, ''],
    [isObj, list],
    [R.T, R.identity],
  ]));
  const sayLn = staffObj => R.unless(R.isNil, formatlns)(formatStaffObj(staffObj));
  const writeStaffActually = R.pipe();
  function aID(pe) {
    let id = null;
    if (pe.id && pe.id in areaData) {
      id = pe.id;
    }
    return id;
  }
  const target = R.prop('target');
  const parentElement = R.prop('parentElement');
  const dimTarget = R.pipe(target, dim);
  const undimTarget = R.pipe(target, undim);
  window.activeArea = null;
  const setActiveAreaVariableTo = mutate(window, 'activeArea');
  const getActiveArea = () => activeArea;
  const deactivateChain = toAll(dim, wait(setActiveAreaVariableTo, null));

  function deactivateCurrentArea() {
    if (activeArea) {
      deactivateChain(activeArea);
      activeArea = null;
    }
  }
  const activateChain = toAll(undim, setActiveAreaVariableTo);
  const activateArea = toAll(deactivateCurrentArea, activateChain);

  function mapClick(e) {
    const el = target(e);
    const parentEl = parentElement(el);
    if (parentEl) {
      const id = aID(parentEl);
      const data = areaData[id];
      R.pipe(sayLn, console.log)(data);
      andAnd(activeArea, dim)(activeArea);
      activeArea = el;
      undimTarget(e);
    } else {
      andAnd(activeArea, dim)(activeArea);
      activeArea = null;
    }
  }

  function mapMouseOver(e) {}

  function mapMouseOut(e) {}

  mapAEL('click', mapClick);
  mapAEL('mouseover', mapMouseOver);
  mapAEL('mouseout', mapMouseOut);
  // --End--


  // make the clock work

  // Time Functions
  const getTime = R.pipe(Date, splitBy(' '), sliceFrom0to(5), joinBy(' '));
  //    nullAry
  const getTimeElement = R.prop('ictime');
  //    (elements) => element
  // Time Style Functions
  const getWidthNumber = R.pipe(getComputedStyle, R.prop('width'), sliceFrom0to(-2));
  const processWidthNumber = R.pipe(getWidthNumber, divideBy(infoCardFontDivisor), Math.round, toString, append('px'));
  const setFontSize = kariN(2, R.pipe(R.prop('style'), mutate(R.__, 'fontSize')));
  const setProcessedWidthNumber = R.converge(setFontSize, [R.identity, processWidthNumber]);

  const timeElement = getTimeElement(elements);
  window.addEventListener('resize', wait(setProcessedWidthNumber, timeElement));
  const setTimeElementInnerHTMLTo = setInnerHTMLOf(timeElement);
  setTimeElementInnerHTMLTo(getTime());
  setInterval(() => {
    setTimeElementInnerHTMLTo(getTime());
  }, 500);
}
window.addEventListener('load', init);
