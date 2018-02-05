def debrujin(alpha, n):
  base = len(alpha)
  highestValue = base ** n - 1
  endStringLength = highestValue + n
  string = alpha[0] * n + alpha[1]
  alphaLocation = 0
  while len(string) < endStringLength:
    chunk = string[1 - n:]
    beta = alpha[alphaLocation]
    if string.find(chunk + beta) + 1:
      alphaLocation += 1
      if alphaLocation >= base:
        lastChar = string[-1:]
        lastCharPos = alpha.find(lastChar)
        alphaLocation = lastCharPos + 1
        string = string[:-1]
    else:
      string += beta
      alphaLocation = 0
  return string