/*
 * Author: Cole Gannon / Falfa
 * I really like how I wrote this and I'm proud of it
 * Also, if you don't know the concepts behind functional
 * programming, you're in for a really really fun ride
 * Helper functions
 */
let globalVariable = null;
const dot = R.curry((str, obj) => str.split`.`.reduce((acc, val) => acc[val], obj)),
  wrap = R.curry((fn, arg) => () => fn(arg)),
  wrapFn = R.curry((fn, arg) => () => fn(arg())),
  ignore = () => undefined,
  invoke = R.curry((prop, args, obj) => obj[prop].bind(obj)(args)),
  // Str => * => obj
  list = R.unapply(R.identity),
  kariN = R.pipe(R.uncurryN, R.curry),
  logArgs = (...args) => console.log(args),
  log = (arg) => {
    console.log(arg);
    return arg;
  },
  changeEveryKey = o => R.pipe(R.toPairs, R.map(p => [R.isNil(o[p[0]]) ? p[0] : o[p[0]], p[1]]), R.fromPairs),
  isBool = R.pipe(R.type, R.equals("Boolean")),
  // Flow
  split = (...fns) => arg => fns.map(fn => fn(arg)),
  mergeTwo = (fn0, fn1) => R.converge(fn1, [R.identity, fn0]),
  pipeN = R.curryN(R.__, R.pipe),
  pipe2 = pipeN(2),
  pipeline = (ary, ...fns) => (...args) => Array.from(args).reduce((a, v, idx) => {
    const argpos = a[0],
      passedArgs = a[1],
      argcount = ary[idx],
      fn = fns[idx];
    if (argcount > 0) {
      const fnargs = passedArgs.concat(args.slice(argpos, argcount + argpos));
      return [argpos + argcount, [fn.apply(0, fnargs)]];
    }
    return [argpos, [fn]];
  }, [0, []])[1][0],

  /*
   * ^ oh geez
   * Logic
   */
  replaceNullWithOne = R.when(R.equals(null), R.always(1)),

  // Props
  toString = R.invoker(0, "toString"),
  // * => str
  append = R.flip(R.concat),
  // Str => str
  sliceFrom0to = R.slice(0),
  // Str => str
  splitBy = R.split,
  // Str => ary
  joinBy = R.join,
  // Ary => str
  divideBy = R.flip(R.divide),
  // * => #
  multiplyBy = R.multiply,
  // * => #

  // API
  geti = invoke("getElementById"),
  // Id => DOM => el
  getiFrom = R.flip(geti),
  // DOM => id => el
  interval = R.curry(setInterval),
  // Fn => ms => #
  setIntervalWithArgument = (fn, arg, ms) => setInterval(wrap(fn, arg), ms),
  // Fn => arg => ms => #
  setElementInnerText = R.curry((el, str) => { el.innerHTML = str; }),
  /*
   * El => str => str
   * What's funny is that it actually sets the innerHTML
   */
  getMapFrom = geti("map");
// DOM => el

// Dim & Undim
{
  const num = 1.8;
  var elOpacity = R.pipe(invoke("getAttribute", "fill-opacity"), replaceNullWithOne);
  // El => #
  const setElOpacity = R.flip(R.invoker(2, "setAttribute")("fill-opacity"));
  // # => el => null
  var dimElement = mergeTwo(R.pipe(elOpacity, divideBy(num)), setElOpacity);
  // El => null
  const dimFirstChild = R.pipe(dot("firstChild"), dimElement);
  // El => null
  var mapGetiFrom = R.pipe(getMapFrom, dot("contentDocument"), getiFrom),
    // DOM => id => el
    mapOverKeysOf = R.pipe(Object.keys, R.flip(invoke("map"))),
    // Fn => ary
    dimMapElementsFrom = (DOM, data) => mapOverKeysOf(data)(R.pipe(mapGetiFrom(DOM), dimFirstChild)),
    // DOM => data => null
    undimElement = mergeTwo(R.pipe(elOpacity, multiplyBy(num)), setElOpacity),
    // El => null
    dimTarget = R.pipe(dot("target"), dimElement),
    // Event => null
    undimTarget = R.pipe(dot("target"), undimElement);
  // Event => null
}

// Time
{
  var getTimeElement = geti("ictime");
  // DOM => el
  const time = R.pipe(Date, splitBy(" "), sliceFrom0to(5), joinBy(" "));
  // Null => str
  var setTimeInnerTextToTimeFrom = DOM => setElementInnerText(getTimeElement(DOM), time());
  // DOM => str => str
}
// Time Fontsize
{
  const fontDivisor = 16,
    getWidth = R.pipe(window.getComputedStyle, R.prop("width"), sliceFrom0to(-2)),
    // El => str
    processWidth = R.pipe(getWidth, divideBy(fontDivisor), Math.round, toString, append("px")),
    // El => str
    setFontSize = R.curry((el, str) => el.style.fontSize = str);
  // El => str => str
  var calibrateFontSize = R.pipe(getTimeElement, mergeTwo(processWidth, setFontSize));
  // DOM => null
}
// Click Handler
{
  // This stuff may look sorta functional but it isn't pure
  const types = ["Break out space", "Classroom"];
  var active = null;
  const write = id => (DOM, txt) => setElementInnerText(geti(id, DOM), txt),
    // Id => DOM => txt => null
    writeTitle = write("title"),
    // DOM => txt => null
    writeType = write("type"),
    // DOM => txt => null
    writeStaff = write("staff"),
    // DOM => txt => null
    writeDescription = write("description"),
    // DOM => txt => null
    typeString = (obj) => {
      let str = "";
      if (obj.type !== null) {
        if (typeof obj.type === "number") str = `Type: ${types[obj.type]}`;
        else str = `Type: ${obj.type}`;

      }
      return str;
    };
  var staffString = (obj) => {
      let str = "";
      if (obj.staff) {
        if (Array.isArray(obj.staff)) str = `Staff: ${obj.staff.map(dot("lastName")).join(", ")}`;
        else str = `Staff: ${obj.staff.lastName}`;

      }
      return str;
    },
    descriptionString = obj => obj.desc || "",
    // Obj => str
    writeData = R.curry((DOM, e) => {
      if (active) {
        dimElement(active);
        active = null;
      }
      let obj,
        title = "";
      if (e.target.parentElement && (title = e.target.parentNode.id)) {
        obj = areaData[title];
        undimElement(e.target);
        active = e.target;
      } else {
        obj = {
          type: null,
          staff: null,
          desc: "",
        };
      }
      writeTitle(DOM, title);
      writeType(DOM, typeString(obj));
      writeStaff(DOM, staffString(obj));
      writeDescription(DOM, descriptionString(obj));
      globalVariable = title;
      writeCurrents();
    });
  // DOM => event
}
// Dynamic Schedules
{
  const usefulDateFromAPI = R.pipe(
    splitBy(" "),
    changeEveryKey(["day", 0, 0, 0, "time"]),
    mergeTwo(
      R.pipe(
        dot("time"),
        splitBy(":"),
        changeEveryKey(["hours", "minutes", "seconds"]),
      ),
      Object.assign,
    ),
  );
  var getUsefulDate = wrapFn(usefulDateFromAPI, Date),
    timeIslessthan = R.curry((t0, t1) => t0.split`:`.map((v, i, m, M) => (v === (M = t1.split`:`)[i] ? null : Number(v) < Number(M[i]))).find(isBool));
  /*
   * You know your code is good when eslint flags the whole thing as bad
   * Here's where I start giving up on purely functional
   */
  const defaultRoomThingy = "",
    todayIsA = usefulDate => usefulDate.day;
  var getTodayMasterScheduleFrom = R.pipe(getUsefulDate, dot("day"), R.prop)();
  const cpname = document.getElementById("cpname"),
    title = document.getElementById("ctitle"),
    staff = document.getElementById("cstaff"),
    firstKey = obj => obj[Object.keys(obj)[0]],
    periodNames = int => Number.isInteger(Number(int)) ? `${["Zero'th", "First", "Second", "Third", "Fourth", "Fifth", "Sixth"][int]} Period` : int,
    functionalProgrammingStopsBeingFunWhenYourFunctionNamesGetAsLongAsThis = R.pipe(firstKey, periodNames);
  function writeCurrents() {
    if (globalVariable) {
      console.log("The classroom selected is");
      console.log(globalVariable);
      const date = getUsefulDate(),
        today = todayIsA(date);
      console.log("Today is a");
      console.log(today);
      const beforeTime = Object.keys(today).find(timeIslessthan(`${date.hours}:${date.minutes}`)),
        period = schoolPeriodSchedule[today];
      console.log("The period is");
      console.log(period);
      title.innerText = staff.innerText = "";
      let room = null;
      cpname.innerText = functionalProgrammingStopsBeingFunWhenYourFunctionNamesGetAsLongAsThis(period);
      console.log("Fo");
      if (room = areaSchedule[globalVariable]) {
        const roomPeriod = room[period];
        console.log(roomPeriod);
        if (roomPeriod) {
          console.log("Foobar");
          console.log(roomPeriod.title);
          title.innerText = roomPeriod.title || defaultRoomThingy;
          staff.innerText = staffString(roomPeriod);
        } else {
          title.innerText = "There's nothing going on in here right now";
        }
      }
    }
  }
}
const listenMapFrom = R.curry((DOM, e, fn) => getMapFrom(DOM).contentDocument.addEventListener(e, fn));
// DOM => str => fn
function asyncLoad() {
  const listenMap = listenMapFrom(document);
  dimMapElementsFrom(document, areaData);
  calibrateFontSize(document);
  window.addEventListener("resize", wrap(calibrateFontSize, document));
  // eslint, why do you think I'm using "var" instead of "const"?
  // It's so it's not block scoped, dummy
  setTimeInnerTextToTimeFrom(document);
  setIntervalWithArgument(setTimeInnerTextToTimeFrom, document, 999);
  setInterval(writeCurrents, 9999);
  listenMap("mouseover", undimTarget);
  listenMap("mouseout", dimTarget);
  listenMap("click", writeData(document));
}
window.addEventListener("load", asyncLoad);

function invert() {
  document.documentElement.style.filter = "invert(100%)";
}
function uninvert() {
  document.documentElement.style.filter = "";
}
function klick() {
  invert();
  setTimeout(uninvert, 100);
  setTimeout(invert, 200);
  setTimeout(uninvert, 300);
}
