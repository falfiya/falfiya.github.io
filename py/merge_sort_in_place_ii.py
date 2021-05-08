from typing import *
T = TypeVar('T')

from logger import Logger

def swap(data, a, b) -> None:
   data[a], data[b] = data[b], data[a]

def merge_sort_ii(data: List[T], a: int = 0, b: int = None, l: Logger = None) -> None:
   if b is None:
      b = len(data)

   length = b - a
   if length == 1:
      return

   with Logger(f"merge_sort({a}, {b}: {data[a:b]})", l) as l:
      halfway = a + length // 2

      merge_sort_ii(data, a, halfway, l0)
      merge_sort_ii(data, halfway, b, l0)

      i = a
      l = a
      r = halfway

      while l < r and r < b:
         # l1(f"{data}")
         # l1(f"{i = },{l = },{r = }")
         if data[r] < data[l]:
            l("r < l")
            if l == i:
               l("trigram")
            r += 1
         else:
            l("l < r")
            swap(data, i, l)
            l += 1
         i += 1
