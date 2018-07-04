const picker = (n, f, m) => (...a) => {
  const l = Array(n).fill(0).map((v, i) => a[i]).concat(f);
  l.slice(n).forEach((fn, i) => {
    const ri = i + n;
    const A = Array.isArray(m[i]) ? m[i] : [m[i]];
    l[ri] = fn(...A.map((indx) => l[indx]));
  });
  return l[l.length - 1];
};
