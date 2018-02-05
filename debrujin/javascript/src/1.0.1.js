function debrujin(alpha, n) {
  const base = alpha.length;

  let string = alpha[0].repeat(n);
  let alphaLocation = 0;
  for (;string.length < parseInt(String(base - 1).repeat(n), base) + n;) {
    const beta = alpha[alphaLocation];
    if (string.match(string.slice(string.length - n + 1, string.length) + beta)) {
      if (++alphaLocation >= base) {
        alphaLocation = alpha.indexOf(string[string.length - 1]) + 1;
        string = string.replace(/.$/, '');
      }
    } else {
      string += beta;
      alphaLocation = 0;
    }
  }
  return string;
}