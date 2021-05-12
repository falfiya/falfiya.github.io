from typing import *
T = TypeVar('T')

from Logger import Logger

def merge_sort_iii(data: List[T], a: int = 0, b: int = None, L: Logger = None) -> None:
   if b is None:
      b = len(data)

   length = b - a
   if length == 1:
      return

   with Logger(f"merge_sort({a}, {b}: {data[a:b]})", L) as L:
      halfway = a + length // 2

      merge_sort_iii(data, a, halfway, L)
      merge_sort_iii(data, halfway, b, L)
      L(f"{data[a:halfway]}|{data[halfway:b]}")

      i = a
      l = a
      r = halfway

      with Logger("loop", L) as L:
         import list_utils
         from swap import swap
         while i < b - 1:
            L(list_utils.label(data, {i: 'v'}))
            L(repr(data))
            L(list_utils.label(data, {l: 'l', r: 'r'}))
            if data[r] < data[l]:
               if data[r] < data[i]:
                  L("i <-> r")
                  swap(data, i, r)
                  if l == i:
                     l = r
                     L("far right trigram")

                  if r + 1 < b:
                     r += 1

               else:
                  L("no swap!")
            else:
               if l == i and l + 1 == r:
                  L("close left trigram")
                  break

               if data[l] < data[i]:
                  L("i <-> r")
                  swap(data, i, l)
               else:
                  L("no swap but still move right!")
                  if l + 1 < r:
                     l += 1

            i += 1

      L(f"<- {data[a:b]}")
