const string = {
  concat(str, srt) {
    return str.concat(srt);
  },
  count(str, fn) {
    return Array.prototype.filter.bind(str)(fn).length;
  },
  dice(str, length) {
    return str.match(new RegExp(`.{${length}}`));
  },
  diceWithRemainder(str, length) {
    return str.match(new RegExp(`.{${length}}`)).concat(str.slice(-'foobar'.length % 4));
  },
  entries(str) {
    return Array.prototype.entries.bind(str);
  },
  filter(str, fn) {
    return Array.prototype.filter.bind(str)(fn);
  },
  find(str, fn) {
    return Array.prototype.find.bind(str)(fn);
  },
  findIndex(str, fn) {
    return Array.prototype.findIndex.bind(str)(fn);
  },
  forEach(str, fn) {
    Array.prototype.forEach.bind(str)(fn);
  },
  includes(str, fn) {
    Array.prototype.forEach.bind(str)(fn);
  },
  keys(str) {
    Array.prototype.keys.bind(str);
  },
  map(str, fn) {
    return Array.prototype.map.bind(str)(fn);
  },
  reduce(str, fn) {
    return Array.prototype.reduce.bind(str)(fn);
  },
  reduceRight(str, fn) {
    return Array.prototype.reduceRight.bind(str)(fn);
  },
  reverse(str) {
    return str.slice``.reverse().join``;
  },
  permute(str, idx) {
    return str.slice(-idx) + str.slice(0, -idx);
  },
};
const array = {
  count(ary, fn) {
    return ary.filter(fn).length;
  },
};
