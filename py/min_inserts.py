import random

from typing import TypeVar, Generic

T = TypeVar("T")

index = int

################################################################################
# Helpers
class Sublist(Generic[T]):
   def __init__(self, underlaying: list[T], marked: list[index] = []):
      self.underlaying = underlaying
      self._marked = marked

   def mark(self, idx: index):
      if idx < len(self.underlaying):
         return Sublist(self.underlaying, self._marked + [idx])
      else:
         raise IndexError("Index out of bounds in sublist!")

   def is_marked(self, idx: index):
      return idx in self._marked

   def __invert__(self):
      return Sublist(
         self.underlaying,
         [i for i in range(0, len(self.underlaying)) if not self.is_marked(i)],
      )

   def __len__(self) -> int:
      return len(self._marked)

   @property
   def marked(self) -> list[T]:
      """
      Construct a list of only the marked elements
      """
      return [elem for i, elem in enumerate(self.underlaying) if self.is_marked(i)]

   @property
   def last_marked(self) -> T:
      """
      Get the element last marked in time, not necessarily the highest index marked.
      """
      return self.underlaying[self._marked[-1]]

################################################################################
# AbstractProxyFactoryMainConsumer
MAX_NUMBER = 20
LONGEST_NUMBER = len(str(MAX_NUMBER))

sort_me = list(range(1, MAX_NUMBER + 1))
random.shuffle(sort_me)

def itoa(i: int) -> str:
   return str(i).rjust(LONGEST_NUMBER, "0")

def sorting_progress():
   print(", ".join([itoa(i) for i in sort_me]))


# brute force because why not
in_order_sublists: list[Sublist[int]] = [Sublist(sort_me)]
for i, thing_that_is_being_sorted in enumerate(sort_me):
   for sublist in in_order_sublists:
      if len(sublist) == 0 or sublist.last_marked < thing_that_is_being_sorted:
         in_order_sublists.append(sublist.mark(i))

longest_in_order_sublist = max(in_order_sublists, key=len)


sorting_progress()
for i in range(0, len(sort_me)):
   if longest_in_order_sublist.is_marked(i):
      print(" " * LONGEST_NUMBER, end="  ")
   else:
      print("^" * LONGEST_NUMBER, end="  ")
print()


elements_to_move = (~longest_in_order_sublist).marked

def move(target: int, element_before: int):
   """
   Notice that these are not indexes.
   """

   # remove target
   sort_me.pop(sort_me.index(target))

   # reinsert target
   if element_before < 1:
      sort_me.insert(0, target)
   else:
      sort_me.insert(sort_me.index(element_before) + 1, target)

for move_me in sorted(elements_to_move):
   b4 = move_me - 1
   print(f"{itoa(b4)} -> {itoa(move_me)}")
   move(move_me, b4)
   sorting_progress()
