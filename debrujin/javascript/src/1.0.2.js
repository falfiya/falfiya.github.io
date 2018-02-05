function debrujin(alpha, n) {
  const base = alpha.length; /* What base the sequence is going to be in */
  const highestValue = parseInt(String(base - 1).repeat(n), base); /* The highest number possible for the base with length [n] */
  const endStringLength = highestValue + n; /* How many characters the string should be. */
  /* Plus [n] because the [n] characters at the end of the string don't form anything */
  
  let string = alpha[0].repeat(n) + alpha[1]; /* Setting up the string with a few characters that work automatically */
  let alphaLocation = 0; /* The position in the alphabet that the for loop will be using to write to the string */
  while (string.length < endStringLength) { /* Keep running until the string is at the proper length */
    const chunk = string.slice(1 - n); /* The last [n] - 1 characters of the string */
    const beta = alpha[alphaLocation]; /* The character in the alphabet that's being tested */
    if (string.match(chunk + beta)) { /* If [string] already contains [chunk] and [beta] */
      alphaLocation ++; /* Increment [alphaLocation] */
      if (alphaLocation >= base) { /* If [alphaLocation]'s count is within the current [base] */
        const lastChar = string.slice(-1); /* Set [lastChar] to the last character in [string] */
        const lastCharPos = alpha.indexOf(lastChar); /* Set [lastCharPos] to the place where [lastChar] is in [alpha] */
        alphaLocation = lastCharPos + 1; /* Set [alphaLocation] to one above [lastCharPos] */
        string = string.slice(0, -1); /* Remove a character from [string] */
      }
    } else {
      string += beta; /* Add [beta] to [string] */
      alphaLocation = 0; /* Reset [alphaLocation] */
    }
  }
  return string;
}
