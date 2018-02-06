const s = '\0';
const e = '퟿';
function transform(string) {
  return Array.prototype.map.bind(s + string + e)((_, idx, str) => str.slice(-idx) + str.slice(0, -idx))
    .sort()
    .map(permutation => permutation[string.length + 1])
    .join``;
}
function untransform(string) {
  const ary = string.split``;
  let oary = string.split``.sort();
  while (oary[0].length < string.length) {
    oary = ary.map((val, idx) => val + oary[idx]).sort();
  }
  return oary[string.length - 1].slice(2);
}
