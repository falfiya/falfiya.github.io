from typing import *
from list_utils import label

def majority(ary: list[int]) -> Optional[int]:
   l: int = len(ary)
   if l == 0: return None
   if l == 1: return ary[0]

   run: int = ary[0]
   count: int = 1
   i = 1

   for e in ary[1:]:
      print("--------")
      print(f"{run = }")
      print(f"{count = }")
      print(label(ary, {i: "v"}))
      print(ary)
      if e == run:
         count += 1
      else:
         count -= 1
      if count == 0:
         run = e
      print(f"{run = }")
      print(f"{count = }")
      i += 1

majority([5, 5, 9, 3, 3])
