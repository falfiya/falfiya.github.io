module.exports = (ary) => {
  const tracker = new Map();
  const aryn = [];
  ary.forEach((v) => {
    if (!tracker.has(v)) {
      tracker.set(v, true);
      aryn.push(v);
    }
  });
  return aryn;
};
