from __future__ import annotations
from typing import *

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

def printer(fn: Fn) -> Fn:
   def printer_wrapper(*args):
      out = fn(*args)
      print(f"{fn.__name__}{','.join(map(repr, args))} = {out}")
      return out
   return printer_wrapper

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
   def __repr__(self) -> str:
      return f"{self.x:2d},{self.y:2d},{self.z:2d}"

# boolean space of occupation
class Cube:
   def in_bounds(r3: R3):
      coords = r3.as_tuple()
      return 0 <= min(coords) and max(coords) < 3

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
      self._filled = filled

   def fill(self, r3: R3) -> Self:
      self._filled[Cube.__R3_to_index(r3)] = True
      return self

   def is_filled(self, r3: R3) -> bool:
      return self._filled[Cube.__R3_to_index(r3)]

   def is_empty(self, r3: R3) -> bool:
      return not self.is_filled(r3)

   def okay(self, r3: R3) -> Self:
      return Cube.in_bounds(r3) and self.is_empty(r3)

   def __repr__(self):
      out = ""
      for i, e in enumerate(self._filled):
         if i > 1 and i % 3 == 0:
            out += "\n"
         if i % 9 == 0:
            out += "      \n"
         if e:
            if i % 2 == 0:
               out += "o "
            else:
               out += "o "
         else:
            out += ". "
      return out

   def copy(self) -> Self:
      return type(self)(self._filled.copy())

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
      mag = abs(x + y + z)
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

steps = list[R3]
class CubeHistoryState:
   def __init__(self, steps: steps, cube: Cube):
      self.steps = steps
      self.cube = cube
   def __repr__(self) -> str:
      return "\n".join([
         *[f"# {step}  #" for step in self.steps],
         *[f"#   {line}  #" for line in repr(self.cube).splitlines()],
      ])
   def copy(self) -> Self:
      return type(self)([], self.cube.copy())

class CubeHistory(list[CubeHistoryState]):
   def __init__(self, it: Iterator[CubeHistoryState] = [CubeHistoryState([], Cube())]):
      super().__init__(it)

   def cu_fill(self, r3: R3):
      self[-1].steps.append(r3)
      self[-1].cube.fill(r3)

   def cu_okay(self, r3: R3) -> bool:
      return self[-1].cube.okay(r3)

   def __repr__(self):
      out = ""
      for i, history_state in enumerate(self):
         # f"############",
         # f"# Step  99 #",
         # f"#   - - -  #",
         # f"# 0, 0, 3  #,
         # f"############",
         out += "\n".join([
            f"#############",
            f"#  Step {i + 1:2d}  #",
            *repr(history_state).splitlines(),
            f"#############",
            f"",
         ])
      return out

   def next(self) -> Self:
      assert len(self) > 0, "CubeHistory should never be empty!"
      return CubeHistory([*self, self[-1].copy()])

   def copy(self) -> Self:
      return type(self)(self)

def try_permute(*, turns: list[int], pos: R3, ori: Ori, ch: CubeHistory, po="") -> Optional[list[Cube]]:
   if len(turns) == 0:
      return [ch]
   count = turns[0]
   turns = turns[1:]
   assert count > 0, "count must be > 0"

   for _ in range(0, count):
      pos += ori
      if not ch.cu_okay(pos):
         print(f"{po} died")
         return None
      ch.cu_fill(pos)
      print(f"{po}{pos} + {ori}")


   possible_histories = []
   for new_ori in ori.perp():
      hist = try_permute(turns=turns, pos=pos, ori=new_ori, ch=ch.next(), po=po + "   ")
      if hist is not None:
         for h in hist:
            possible_histories.append(h)

   return possible_histories

def base():
   ch = CubeHistory()

   pos = R3(0, 0, 0)
   ch.cu_fill(pos)

   pos += x
   ch.cu_fill(pos)

   pos += x
   ch.cu_fill(pos)

   turns = [2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2]
   for i, sol in enumerate(try_permute(turns=turns, pos=pos, ori=y, ch=ch.next())):
      print(f"Solution #{i + 1}")
      print(sol)

   # print(ch)
   # try_permute()

base()
