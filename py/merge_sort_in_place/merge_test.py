import output
from color_int import color_int
from itertools import permutations
from merge_sort_in_place.merge_i import merge_i

def is_sorted(lst: list) -> bool:
   copy = lst[:]
   copy.sort()
   return lst == copy

def sort_and_color_each_half(lst: list) -> list:
   halfway = len(lst) // 2
   l = [color_int(l, "yellow") for l in lst[:halfway]]
   r = [color_int(r, "white") for r in lst[halfway:]]
   l.sort()
   r.sort()
   return l + r

test_cases = (
   list(
      map(
         sort_and_color_each_half,
         map(
            list,
            permutations(
               range(0, 4)
            )
         )
      )
   )
)[::2]

for case in test_cases:
   copy = case[:]
   output.buffer()
   merge_i(copy)
   if is_sorted(copy):
      output.close()
      print(f"{case} -> {copy}")
   else:
      output.flush()
      print(f"{case} was merged as {copy}!")
      break
