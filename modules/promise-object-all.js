module.exports = async function (obj) {
  const keys = Object.keys(obj);
  const nobj = {};
  const ary = await Promise.all(keys.map(key => obj[key]));
  ary.forEach((v, i) => { nobj[keys[i]] = v; });
  return nobj;
};
// takes an object of promises and returns a promise of an object
