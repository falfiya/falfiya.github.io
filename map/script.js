const mutate = R.curry((object, key, value) => object[key] = value),
  impure = fn => (...args) => {
    fn(...args);
    return args;
  },
  impure1 = fn => (arg) => {
    fn(arg);
    return arg;
  },
  log = impure1(console.log),
  list = R.unapply(R.identity),
  toAll = (...fns) => arg => fns.map(fn => fn(arg)),
  runAll = (...fns) => fns.map(fn => fn()),
  kariN = R.pipe(R.uncurryN, R.curry),
  fi = R.ifElse(R.__, R.__, R.identity),
  andAnd = R.curry((bool, fn) => (bool ? fn : R.identity)),
  append = R.flip(R.concat),
  divideBy = R.flip(R.divide),
  multiplyBy = R.flip(R.multiply),
  splitBy = R.invoker(1, "split"),
  joinBy = R.invoker(1, "join"),
  toString = R.invoker(0, "toString"),
  sliceFrom0to = R.slice(0),
  wait = R.curry((fn, arg) => () => fn(arg)),
  // Const waitFn = R.curry((fn, argfn) => () => fn(argfn()));
  dot = R.curry((s, o) => s.split`.`.reduce((a, v) => a[v], o)),
  typeuv = (something) => {
    let type;
    if (something === null) type = "null";
    else if (Array.isArray(something)) type = "array";
    else if (Number.isNaN(something)) type = "NaN";
    else type = typeof something;

    return type;
  },
  setInnerHTMLOf = mutate(R.__, "innerHTML"),
  isObj = R.pipe(typeuv, R.equals("object")),
  //    (element, str)

  // Opacity Functions
  nullTo1 = R.ifElse(R.isNil, R.always(1), R.identity),
  // Replace null with one
  getOpacity = R.pipe(R.invoker(1, "getAttribute")("fill-opacity"), nullTo1),
  /*
   *    (element)
   * Get the opacity of an element
   */
  setOpacity = R.flip(R.invoker(2, "setAttribute")("fill-opacity")),
  /*
   *    (element) => (string / number)
   * Set the opacity of an element
   */
  applyFnToOpacity = fn => R.converge(setOpacity, [R.identity, R.pipe(getOpacity, fn)]);
// --End--

function init() {
  const elementIDs = [
      "map",
      "ictitle",
      "ictype",
      "icstaff",
      "icdescription",
      "ictime",
      "sic",
    ],
    elements = {},
    geti = id => document.getElementById(id);
  // Get Elements
  elementIDs.forEach((id) => {
    elements[id] = geti(id);
  });
  const mapDOM = elements.map.contentDocument,
    mapAEL = mapDOM.addEventListener.bind(mapDOM),
    mapGeti = mapDOM.getElementById.bind(mapDOM),
    // MapDom helper functions
    areaDataKeys = Object.keys(areaData),
    // Get ids of every area
    forEachAreaKey = R.forEach(R.__, areaDataKeys),
    // Return a function that'll iterate over these
    getFirstChild = R.pipe(R.prop("children"), R.prop(0)),
    mapGetChild = R.pipe(mapGeti, getFirstChild),
    /*
     * Get the first child from an element with an id from the map
     * Dimming Functions
     */
    divisor = 1.7,
    dim = impure(applyFnToOpacity(divideBy(divisor))),
    undim = applyFnToOpacity(multiplyBy(divisor)),
    dimMapChild = R.pipe(mapGetChild, dim);
  // Dim the above child
  forEachAreaKey(dimMapChild);
  // Dim each child from the ids

  // Event listeners
  const writeTitle = setInnerHTMLOf(elements.ictitle),
    writeStaff = setInnerHTMLOf(elements.icstaff),
    clearStaff = writeStaff(""),
    writeType = setInnerHTMLOf(elements.ictype),
    writeDesc = setInnerHTMLOf(elements.icdescription),

    dotTitle = R.prop("title"),
    dotType = R.prop("type"),
    dotDesc = R.prop("desc"),
    dotStaff = R.prop("staff"),
    dotln = R.prop("lastName");
  formatlns = R.pipe(R.map(dotln), joinBy(", "));
  formatStaffObj = R.pipe(R.prop("staff"), R.cond([
    [R.isNil, ""],
    [isObj, list],
    [R.T, R.identity],
  ]));
  const sayLn = staffObj => R.unless(R.isNil, formatlns)(formatStaffObj(staffObj)),
    writeStaffActually = R.pipe();
  function aID(pe) {
    let id = null;
    if (pe.id && pe.id in areaData) id = pe.id;

    return id;
  }
  const target = R.prop("target"),
    parentElement = R.prop("parentElement"),
    dimTarget = R.pipe(target, dim),
    undimTarget = R.pipe(target, undim);
  window.activeArea = null;
  const setActiveAreaVariableTo = mutate(window, "activeArea"),
    getActiveArea = () => activeArea,
    deactivateChain = toAll(dim, wait(setActiveAreaVariableTo, null));

  function deactivateCurrentArea() {
    if (activeArea) {
      deactivateChain(activeArea);
      activeArea = null;
    }
  }
  const activateChain = toAll(undim, setActiveAreaVariableTo),
    activateArea = toAll(deactivateCurrentArea, activateChain);

  function mapClick(e) {
    const el = target(e),
      parentEl = parentElement(el);
    if (parentEl) {
      const id = aID(parentEl),
        data = areaData[id];
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

  mapAEL("click", mapClick);
  mapAEL("mouseover", mapMouseOver);
  mapAEL("mouseout", mapMouseOut);
  // --End--


  // Make the clock work

  // Time Functions
  const getTime = R.pipe(Date, splitBy(" "), sliceFrom0to(5), joinBy(" ")),
    //    NullAry
    getTimeElement = R.prop("ictime"),
    /*
     *    (elements) => element
     * Time Style Functions
     */
    getWidthNumber = R.pipe(getComputedStyle, R.prop("width"), sliceFrom0to(-2)),
    processWidthNumber = R.pipe(getWidthNumber, divideBy(infoCardFontDivisor), Math.round, toString, append("px")),
    setFontSize = kariN(2, R.pipe(R.prop("style"), mutate(R.__, "fontSize"))),
    setProcessedWidthNumber = R.converge(setFontSize, [R.identity, processWidthNumber]),

    timeElement = getTimeElement(elements);
  window.addEventListener("resize", wait(setProcessedWidthNumber, timeElement));
  const setTimeElementInnerHTMLTo = setInnerHTMLOf(timeElement);
  setTimeElementInnerHTMLTo(getTime());
  setInterval(() => {
    setTimeElementInnerHTMLTo(getTime());
  }, 500);
}
window.addEventListener("load", init);
