from typing import *

T = TypeVar('T')

def merge_sort(data: List[T], a: int = 0, b: int = None, q = "") -> None:
   print(f"{q}merge_sort({a}, {b}: {data[a:b]})")
   Q = q + "   "

   if b is None:
      b = len(data)

   length = b - a

   if length == 1:
      print(f"{q}CELL END")
      return

   halfway = a + length // 2

   merge_sort(data, a, halfway, Q)
   merge_sort(data, halfway, b, Q)
   print(f"{Q}After subcalls: {data[a:halfway]}|{data[halfway:b]}")
   print(f"{Q}currently the list is: {data}")

   l = data[a:halfway]
   L = l[:]
   L.sort()
   if L != l:
      print(f"{Q}LEFT IS NOT SORTED!")
      raise ValueError()

   r = data[halfway:b]
   R = r[:]
   R.sort()
   if R != r:
      print(f"{Q}RIGHT IS NOT SORTED!")
      raise ValueError()

   i    = a
   lidx = a
   ridx = halfway

   print(f"{Q}noop mode: {lidx = }, {ridx = }")
   while True:
      if lidx == ridx:
         print(f"{q}SORTED END")
         last_idx = len(data) - 1
         snd_last_idx = last_idx - 1
         if data[last_idx] < data[snd_last_idx]:
            print(f"{q}FINAL SWAP")
            data[last_idx], data[snd_last_idx] = data[snd_last_idx], data[last_idx]
         return

      if data[ridx] < data[lidx]:
         print(f"{Q}swap mode end")
         break

      print(f"{Q}   not {data[ridx]}@{ridx} < {data[lidx]}@{lidx}")
      lidx += 1
      i += 1

   print(f"{Q}transition into swap mode")
   print(f"{Q}   currently the list is: {data}")

   # swap mode!
   data[i], data[ridx] = data[ridx], data[i]
   lidx = ridx
   ridx += 1
   i += 1

   print(f"{Q}done with transition")

   print(f"{Q}swap mode: {lidx = }, {ridx = }")
   print(f"{Q}   currently the list is: {data}")
   print(f"{Q}not {data[lidx]}@{lidx} < {data[ridx]}@{ridx}")

   print(f"{Q}loop")
   while lidx < ridx and ridx < b:
      print(f"{Q}   currently the list is: {data}, {i = }")
      print(f"{Q}   cmp {lidx = }, {ridx = }")
      if data[lidx] < data[ridx]:
         print(f"{Q}   left")
         data[i], data[lidx] = data[lidx], data[i]
         lidx += 1
      else:
         print(f"{Q}   right")
         data[i], data[ridx] = data[ridx], data[i]
         ridx += 1

      i += 1

   print(f"{Q}SWAP END: {lidx = }, {ridx = }")
   print(f"{Q}currently the list is: {data}")

   last_idx = len(data) - 1
   snd_last_idx = last_idx - 1
   if data[last_idx] < data[snd_last_idx]:
      print(f"{q}FINAL SWAP")
      data[last_idx], data[snd_last_idx] = data[snd_last_idx], data[last_idx]

# d = [4, 75667, 6, 7, 1, 2, 3, 8, 99, -1, 20, -1, 5]
# d = [3, 6, 4, 5, 1, 2]
d = [4, 6, 75667, 1, 2, 7]
print(d)
merge_sort(d)
print(d)
