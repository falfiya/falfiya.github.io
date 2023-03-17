def divisible_by_13(n: int) -> bool:
   n = abs(n)
   if n == 0:
      return True
   if n < 13:
      return False
   nstr = f"{n}"
   first = int(nstr[:-1]) * 3
   last = int(nstr[-1])
   result = first - last
   if result == 0:
      return True
   if result < 0:
      return False
   else:
      return divisible_by_13(result)

for i in range(-2394, 1000000):
   definitely_true = i % 13 == 0
   maybe_true = divisible_by_13(i)
   if maybe_true != definitely_true:
      print(f"{i} not good")
   else:
      pass
      # print("good")
