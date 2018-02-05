def debrujin(alpha, n)
  string = alpha[0] * n
  alphaLocation = 0
  while string.length < base=alpha.length ** n - 1 + n
    if string[string[1 - n, string.length] + beta = alpha[alphaLocation]]
      alphaLocation += 1
      if alphaLocation >= base
        alphaLocation = alpha.index(string[-1]) + 1
        string = string[0...-1]
      end
    else
      string += beta
      alphaLocation = 0
    end
  end
  return string
end