// Author: Cole Gannon / Falfa
// I really like how I wrote this and I'm proud of it
// Helper functions
let globalVariable = null;
const dot = R.curry((str, obj) => str.split`.`.reduce((acc, val) => acc[val], obj));
const wrap = R.curry((fn, arg) => () => fn(arg));
const wrapFn = R.curry((fn, arg) => () => fn(arg()));
const ignore = () => undefined;
const invoke = R.curry((prop, args, obj) => obj[prop].bind(obj)(args));
function foobar() {}
// str => * => obj
const list = R.unapply(R.identity);
const kariN = R.pipe(R.uncurryN, R.curry);
const logArgs = (...args) => console.log(args);
const log = (arg) => {
  console.log(arg);
  return arg;
};
const changeEveryKey = o => R.pipe(R.toPairs, R.map(p => [R.isNil(o[p[0]]) ? p[0] : o[p[0]], p[1]]), R.fromPairs);
const isBool = R.pipe(R.type, R.equals('Boolean'));
// Flow
const split = (...fns) => arg => fns.map(fn => fn(arg));
const mergeTwo = (fn0, fn1) => R.converge(fn1, [R.identity, fn0]);
const pipeN = R.curryN(R.__, R.pipe);
const pipe2 = pipeN(2);
const pipeline = (ary, ...fns) => (...args) => Array.from(args).reduce((a, v, idx) => {
  const argpos = a[0];
  const passedArgs = a[1];
  const argcount = ary[idx];
  const fn = fns[idx];
  if (argcount > 0) {
    const fnargs = passedArgs.concat(args.slice(argpos, argcount + argpos));
    return [argpos + argcount, [fn.apply(0, fnargs)]];
  }
  return [argpos, [fn]];
}, [0, []])[1][0];

// ^ oh geez
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
const multiplyBy = R.multiply;
// * => #

// API
const geti = invoke('getElementById');
// id => DOM => el
const getiFrom = R.flip(geti);
// DOM => id => el
const interval = R.curry(setInterval);
// fn => ms => #
const setIntervalWithArgument = (fn, arg, ms) => setInterval(wrap(fn, arg), ms);
// fn => arg => ms => #
const setElementInnerText = R.curry((el, str) => { el.innerHTML = str; });
// el => str => str
// What's funny is that it actually sets the innerHTML
const getMapFrom = geti('map');
// DOM => el

// Dim & Undim
{
  const num = 1.8;
  var elOpacity = R.pipe(invoke('getAttribute', 'fill-opacity'), replaceNullWithOne);
  // el => #
  const setElOpacity = R.flip(R.invoker(2, 'setAttribute')('fill-opacity'));
  // # => el => null
  var dimElement = mergeTwo(R.pipe(elOpacity, divideBy(num)), setElOpacity);
  // el => null
  const dimFirstChild = R.pipe(dot('firstChild'), dimElement);
  // el => null
  var mapGetiFrom = R.pipe(getMapFrom, dot('contentDocument'), getiFrom);
  // DOM => id => el
  var mapOverKeysOf = R.pipe(Object.keys, R.flip(invoke('map')));
  // fn => ary
  var dimMapElementsFrom = (DOM, data) => mapOverKeysOf(data)(R.pipe(mapGetiFrom(DOM), dimFirstChild));
  // DOM => data => null
  var undimElement = mergeTwo(R.pipe(elOpacity, multiplyBy(num)), setElOpacity);
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
// Click Handler
{
  // This stuff may look sorta functional but it isn't pure
  const types = ['Break out space', 'Classroom'];
  var active = null;
  const write = id => (DOM, txt) => setElementInnerText(geti(id, DOM), txt);
  // id => DOM => txt => null
  const writeTitle = write('title');
  // DOM => txt => null
  const writeType = write('type');
  // DOM => txt => null
  const writeStaff = write('staff');
  // DOM => txt => null
  const writeDescription = write('description');
  // DOM => txt => null
  const typeString = (obj) => {
    let str = '';
    if (obj.type !== null) {
      if (typeof obj.type === 'number') {
        str = `Type: ${types[obj.type]}`;
      } else {
        str = `Type: ${obj.type}`;
      }
    }
    return str;
  };
  var staffString = (obj) => {
    let str = '';
    if (obj.staff) {
      if (Array.isArray(obj.staff)) {
        str = `Staff: ${obj.staff.map(dot('lastName')).join(', ')}`;
      } else {
        str = `Staff: ${obj.staff.lastName}`;
      }
    }
    return str;
  };
  var descriptionString = obj => obj.desc || '';
  // obj => str
  var writeData = R.curry((DOM, e) => {
    if (active) {
      dimElement(active);
      active = null;
    }
    let obj;
    let title = '';
    if (e.target.parentElement && (title = e.target.parentNode.id)) {
      obj = areaData[title];
      undimElement(e.target);
      active = e.target;
    } else {
      obj = {
        type: null,
        staff: null,
        desc: '',
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
    splitBy(' '),
    changeEveryKey(['day', 0, 0, 0, 'time']),
    mergeTwo(
      R.pipe(
        dot('time'),
        splitBy(':'),
        changeEveryKey(['hours', 'minutes', 'seconds']),
      ),
      Object.assign,
    ),
  );
  var getUsefulDate = wrapFn(usefulDateFromAPI, Date);
  var timeIslessthan = R.curry((t0, t1) => t0.split`:`.map((v, i, m, M) => (v === (M = t1.split`:`)[i] ? null : +v < +M[i])).find(isBool));
  // You know your code is good when eslint flags the whole thing as bad
  // Here's where I start giving up on purely functional
  const todayIsA = usefulDate => schoolPeriodSchedule[usefulDate.day];
  var getTodayMasterScheduleFrom = R.pipe(getUsefulDate, dot('day'), R.prop)();
  function writeCurrents() {
    if (globalVariable) {
      console.log(globalVariable);
      const date = getUsefulDate();
      const title = document.getElementById('ctitle');
      const staff = document.getElementById('cstaff');
      const today = todayIsA(date);
      console.log(today);
      const beforeTime = Object.keys(today).find(timeIslessthan(`${date.hours}:${date.minutes}`));
      const period = today[beforeTime];
      title.innerText = staff.innerText = '';
      let room = null;
      if (+period) {
        if (room = areaSchedule[globalVariable]) {
          const roomPeriod = room[period];
          console.log(roomPeriod);
          if (roomPeriod) {
            title.innerText = roomPeriod.title;
            staff.innerText = staffString(roomPeriod);
          } else {
            title.innerText = "There's nothing going on in here right now";
          }
        }
      } else {
        title.innerText = period;
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
  window.addEventListener('resize', wrap(calibrateFontSize, document));
  setTimeInnerTextToTimeFrom(document);
  setIntervalWithArgument(setTimeInnerTextToTimeFrom, document, 999);
  setInterval(writeCurrents, 9999);
  listenMap('mouseover', undimTarget);
  listenMap('mouseout', dimTarget);
  listenMap('click', writeData(document));
}
window.addEventListener('load', asyncLoad);

function invert() {
  document.documentElement.style.filter = 'invert(100%)';
}
function uninvert() {
  document.documentElement.style.filter = '';
}
function klick() {
  invert();
  setTimeout(uninvert, 100);
  setTimeout(invert, 200);
  setTimeout(uninvert, 300);
}
