from typing import *
T = TypeVar('T')

import itertools
test_cases = [list(x) for x in itertools.permutations([0, 1, 2, 3, 4, 5, 6, 7])]

def is_sorted(lst: List[T]) -> bool:
   copy = lst[:]
   copy.sort()
   return lst == copy

from merge_sort_in_place_iii import merge_sort_iii
import output

for case in test_cases:
   copy = case[:]
   output.buffer()
   merge_sort_iii(copy)
   if is_sorted(copy):
      output.close()
      print(f"OK {case}")
   else:
      output.flush()
      print(f"{case} was sorted as {copy}!")
      break
