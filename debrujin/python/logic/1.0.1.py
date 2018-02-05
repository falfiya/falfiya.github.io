def debrujin(alpha, n):
  base = len(alpha)
  string = alpha[0] * n
  alphaLocation = 0
  while len(string) < base ** n - 1 + n:
    beta = alpha[alphaLocation]
    if string.find(string[1 - n:] + beta) + 1:
      alphaLocation += 1
      if alphaLocation >= base:
        alphaLocation = alpha.find(string[-1:]) + 1
        string = string[:-1]
    else:
      string += beta
      alphaLocation = 0
  return string