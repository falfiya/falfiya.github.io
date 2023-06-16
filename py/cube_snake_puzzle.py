from __future__ import annotations
from typing import *

class R3:
   def __init__(self, x: int, y: int, z: int):
      self.x = x
      self.y = y
      self.z = z
   def as_tuple(self) -> tuple[int, int, int]:
      return (self.x, self.y, self.z)
   def __compatible(other: Any) -> bool:
      return isinstance(other, int) or isinstance(other, R3) or isinstance(other, tuple) and len(other) == 3
   def __extract_values(other: Any) -> tuple[int, int, int]:
      if isinstance(other, int):
         x, y, z = other, other, other
      elif isinstance(other, tuple):
         x, y, z = other
      elif isinstance(other, R3):
         x, y, z = other.x, other.y, other.z
      return x, y, z
   def __mul__(self, other: Any) -> Self:
      if R3.__compatible(other):
         x, y, z = R3.__extract_values(other)
         return type(self)(self.x * x, self.y * y, self.z * z)
      else:
         return NotImplementedError("Incompatible argument")
   def __add__(self, other: Any) -> Self:
      if R3.__compatible(other):
         x, y, z = R3.__extract_values(other)
         return type(self)(self.x + x, self.y + y, self.z + z)
      else:
         return NotImplementedError("Incompatible argument")
   def __sub__(self, other: Any) -> Self:
      if R3.__compatible(other):
         x, y, z = R3.__extract_values(other)
         return type(self)(self.x - x, self.y - y, self.z - z)
      else:
         return NotImplementedError("Incompatible argument")

# boolean space of occupation
class occupied:
   index = int
   occ = [False] * 3 * 3 * 3
   def R3_to_index(r3: R3) -> index:
      return r3.x + r3.y * 3 + r3.z * 3 * 3
   __test_idx_last: index = -1
   for z in (0, 1, 2):
      for y in (0, 1, 2):
         for x in (0, 1, 2):
            new_index = R3_to_index(R3(x, y, z))
            assert new_index > __test_idx_last, "indexes should only increase"
            __test_idx_last = new_index
   def print():
      for i, e in enumerate(occupied.occ):
         if i % 3 == 0:
            print()
         if i % 9 == 0:
            print("- - -")
         if e:
            print(end="o ")
         else:
            print(end=". ")
   def take(r3: R3):
      occupied.occ[occupied.R3_to_index(r3)] = True
   def in_bounds(r3: R3):
      coords = r3.as_tuple()
      return 0 >= min(coords) and max(coords) < 3
   class taken_R3(R3):
      def __init__(self, x: int, y: int, z: int):
         super().__init__(x, y, z)
         occupied.take(self)

x = R3(1, 0, 0)
y = R3(0, 1, 0)
z = R3(0, 0, 1)

def base_setup():
   occupied.taken_R3(0, 0, 0) + x + x + y + y - x
base_setup()
occupied.print()
turns = []


def try_next(position: R3, direction: R3):
   ...
