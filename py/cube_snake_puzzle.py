from __future__ import annotations
from typing import *
import traceback

T = TypeVar("T")
Fn = TypeVar("Fn", bound=Callable)

def memoized(fn: Fn) -> Fn:
   cache = {}
   def memoized_fn(*args):
      if args in cache:
         return cache[args]
      else:
         ret = fn(*args)
         cache[args] = ret
         return ret
   return memoized_fn

class R3:
   def __init__(self, x: int, y: int, z: int):
         assert type(x) is int
         assert type(y) is int
         assert type(z) is int
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
class Cube:
   def in_bounds(r3: R3):
      coords = r3.as_tuple()
      return 0 >= min(coords) and max(coords) < 3

   __index = int
   def __R3_to_index(r3: R3) -> __index:
      return r3.x + r3.y * 3 + r3.z * 3 * 3

   # short tests
   __test_idx_last: __index = -1
   for z in (0, 1, 2):
      for y in (0, 1, 2):
         for x in (0, 1, 2):
            new_index = __R3_to_index(R3(x, y, z))
            assert new_index > __test_idx_last, "indexes should only increase"
            __test_idx_last = new_index

   # instance methods
   def __init__(self, filled: list[bool] = [False] * 3 * 3 * 3):
      self.filled = filled

   def fill(self, r3: R3):
      self.filled[Cube.R3_to_index(r3)] = True

   def __repr__(self):
      out = ""
      for i, e in enumerate(self.filled):
         if i % 3 == 0:
            out += "\n"
         if i % 9 == 0:
            out += "- - -\n"
         if e:
            out += "o "
         else:
            out += ". "
      return out

   def copy(self) -> Self:
      return type(self)(self.filled.copy())

@memoized
class Ori(R3):
   """
   An orientation inside the cube
   """
   def __init__(self, x: int, y: int, z: int):
      super().__init__(x, y, z)
      count = 0
      if x != 0: count += 1
      if y != 0: count += 1
      if z != 0: count += 1
      assert count == 1, "An orientation must contain one nonzero element"
      mag = x + y + z
      assert mag == 1, "An orientation must have magnitude 1"
   # @memoized
   def perp(self) -> tuple[Self, Self, Self, Self]:
      me = type(self)
      xs = me(1, 0, 0), me(-1, 0, 0)
      ys = me(0, 1, 0), me( 0,-1, 0)
      zs = me(0, 0, 1), me( 0, 0,-1)
      if self.x != 0: return *ys, *zs
      if self.y != 0: return *xs, *zs
      if self.z != 0: return *xs, *ys

x = Ori(1, 0, 0)
y = Ori(0, 1, 0)
z = Ori(0, 0, 1)

class CubeHistory(list[Cube]):
   def __init__(self, initial_pos: R3, initial_ori: Ori):
      super().__init__()
      that_cube = self[-1]
      class Cursor(R3):
         def __init__(self, *args):
            super().__init__(*args)
            that_cube.fill()
      self.cursor = Cursor(*initial_pos.as_tuple)
      self.append(Cube())

   def __repr__(self):
      out = ""
      for i, e in enumerate(self):
         # f"###########",
         # f"# Step 99 #",
         # f"#  - - -  #",
         # f"###########",
         out += "\n".join([
            f"###########",
            f"# Step {i + 1:2d} #",
            *[f"#  {line}  #" for line in repr(e).splitlines()],
            f"###########",
            f""
         ])

   def next(self) -> CubeHistory:
      if len(self) == 0:
         self.append(Cube())
      else:
         self.append(self[-1].copy())
      return self[-1]

def try_permute(count: int, pos: R3, step: Ori) -> Optional[list[Cube]]:
   assert count > 0, "count must be > 0"
   assert Cube.in_bounds(pos), "position must be in bounds to begin with"
   while count > 0:
      pos += step
      if not Cube.in_bounds(pos):
         return None
      count -= 1

def base():
   chist = CubeHistory()
   Cursor(chist.next()) + x + x
   Cursor(chist.next()) + y
   print(chist)
   # try_permute()

base()
