def is_sorted(lst: list) -> bool:
   copy = lst[:]
   copy.sort()
   return lst == copy

def sort_each_half(lst: list) -> list:
   halfway = len(lst) // 2
   l = lst[:halfway]
   r = lst[halfway:]
   l.sort()
   r.sort()
   return l + r

from itertools import permutations
test_cases = (
   list(
      map(
         sort_each_half,
         map(
            list,
            permutations(
               range(0, 4)
            )
         )
      )
   )
)[::2]

import output
from merge_sort_in_place.merge_i import merge_i

for case in test_cases:
   copy = case[:]
   output.buffer()
   merge_i(copy)
   if is_sorted(copy):
      output.close()
      print(f"OK {case}")
   else:
      output.flush()
      print(f"{case} was sorted as {copy}!")
      break
