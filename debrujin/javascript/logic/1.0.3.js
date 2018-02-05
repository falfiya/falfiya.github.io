function debrujin(alpha, n) {
  const base = alpha.length;

  let string = alpha[0].repeat(n);
  let alphaLocation = 0;
  while (string.length < base ** n - 1 + n) {
    const beta = alpha[alphaLocation];
    if (string.match(string.slice(1 - n) + beta)) {
      if (++alphaLocation >= base) {
        alphaLocation = alpha.indexOf(string.slice(-1)) + 1;
        string = string.slice(0, -1);
      }
    } else {
      string += beta;
      alphaLocation = 0;
    }
  }
  return string;
}