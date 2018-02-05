function debrujin(alpha, n) {
  const base = alpha.length;

  let string = alpha[0].repeat(n);
  let alphaLocation = 0;
  while (string.length < parseInt(String(base - 1).repeat(n), base) + n) {
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