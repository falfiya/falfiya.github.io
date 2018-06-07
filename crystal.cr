def debrujin(alpha, n)
  base = alpha.length
  highestValue = base ** n - 1
  endStringLength = highestValue + n
  string = alpha[0] * n + alpha[1]
  alphaLocation = 0
  while string.length < endStringLength
    chunk = string[1 - n, string.length]
    beta = alpha[alphaLocation]
    if string[chunk + beta]
      alphaLocation += 1
      if alphaLocation >= base
        lastChar = string[-1]
        lastCharPos = alpha.index(lastChar)
        alphaLocation = lastCharPos + 1
        string = string[0...-1]
      end
    else
      string += beta
      alphaLocation = 0
    end
  end
  return string
end
puts debrujin([0, 1], 15)
