from Logger import Logger
from list_utils import label

def swap(data: list, idx_a: int, idx_b: int):
   data[idx_a], data[idx_b] = data[idx_b], data[idx_a]

def merge_i(data: list):
   halfway = len(data) // 2
   # write head
   i = 0
   # compare heads
   l = 0
   r = halfway
   l_counter = 0

   with Logger(f"merge_sort({data[:halfway]}|{data[halfway:]})") as L:
      while True:
         if r == len(data):
            L("r has used up all indecies")
            break
         if l == r:
            L("l has used up all indecies")
            break

         L(f"{l_counter = }")
         L(label(data, {i: 'v'}))
         L(repr(data))
         L(label(data, {l: 'l', r: 'r'}))
         if data[r] < data[l]:
            L("swap i and r")
            swap(data, i, r)
            l = r
            r += 1
         else:
            L("swap i and l")
            swap(data, i, l)
            l += 1

         i += 1
