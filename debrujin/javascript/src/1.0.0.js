function debrujin(alpha, sequenceLength) {
  const base = alpha.length;
  const valueCount = parseInt(String(base - 1).repeat(sequenceLength), base);
  const characterCount = valueCount + sequenceLength;

  let string = alpha[0].repeat(sequenceLength) + alpha[1];

  function recursor(crr = 0) {
    if (string.length < characterCount) {
      // String isn't formed
      const length = string.length;
      const chunk = string.slice(length - sequenceLength + 1, length);
      const beta = alpha[crr];
      if (string.match(chunk + beta)) {
        crr++;
        if (crr < alpha.length) {
          // crr is below the number of characters in alpha
          recursor(crr);
        } else {
          // we've tried all of alpha for this character slot
          const ts = string.split``;
          const pop = ts.pop();
          string = ts.join``;
          // so delete a character and tell recursor to try the next one up
          recursor(alpha.indexOf(pop) + 1);
        }
      } else {
        // The sequenceLength - 1 characters before the current character + alpha[crr] aren't in the string
        string += beta;
        recursor();
      }
    }
  }
  recursor();
  return string;
}
