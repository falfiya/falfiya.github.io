from __future__ import annotations
from typing import *
from termcolor import colored
from traceback import print_stack

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

   index = int
   def to_index(r3: R3) -> index:
      return r3.x + r3.y * 3 + r3.z * 3 * 3

   # short tests
   __test_idx_last: index = -1
   for z in (0, 1, 2):
      for y in (0, 1, 2):
         for x in (0, 1, 2):
            new_index = to_index(R3(x, y, z))
            assert new_index > __test_idx_last, "indexes should only increase"
            __test_idx_last = new_index

   # instance methods
   def __init__(self, filled: list[bool] = [False] * 3 * 3 * 3):
      self._filled = filled

   def fill(self, r3: R3) -> Self:
      self._filled[Cube.to_index(r3)] = True
      return self

   def is_filled(self, r3: R3) -> bool:
      return self._filled[Cube.to_index(r3)]

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
      out = ""
      step_indexes = tuple(Cube.to_index(step) for step in self.steps)
      middle_steps = set(step_indexes[:-1])
      last_step = step_indexes[-1]

      for i, e in enumerate(self.cube._filled):
         if i % 9 == 0:
            out += "        \n"
         if i % 3 == 0:
            out += f"{i // 9}│"
         if e:
            if i == last_step:
               out += colored("x ", "yellow")
            elif i in middle_steps:
               out += colored("o ", "cyan")
            else:
               out += "o "
         else:
            out += ". "
         if i % 3 == 2:
            out += "\n"
      return out

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
      state_output: list[str] = []
      LINE_COUNT = 16
      for i, history_state in enumerate(self):
         out = ""
         out += f"┌───────────┐\n"
         out += f"│  Step {i + 1:02d}  │\n"
         for line in repr(history_state).splitlines():
            out += f"│  {line} │\n"
         out += f"│           │\n"
         out += f"└───────────┘\n"
         state_output.append(out)

      # print sxs states out side by side
      sxs = 6
      actual_out = ""
      while len(state_output) > 0:
         window = state_output[:sxs]
         state_output = state_output[sxs:]
         current_states = tuple(so.splitlines() for so in window)
         for current_line in range(0, LINE_COUNT):
            for current_state in current_states:
               actual_out += f"{current_state[current_line]} "
            actual_out += "\n"

      return actual_out

   def next(self) -> Self:
      assert len(self) > 0, "CubeHistory should never be empty!"
      return CubeHistory([*self, self[-1].copy()])

   def copy(self) -> Self:
      return type(self)(self)

def try_permute(*, turns: list[int], pos: R3, ori: Ori, ch: CubeHistory, po="") -> Optional[list[Cube]]:
   assert len(turns) > 0, "SANITY: there must be at least one element in turns"
   count = turns[0]
   turns = turns[1:]
   assert count > 0, "count must be > 0"

   for _ in range(0, count):
      pos += ori
      if not ch.cu_okay(pos):
         return None
      ch.cu_fill(pos)

   # base case
   if len(turns) == 0:
      return [ch]

   possible_histories = []
   for new_ori in ori.perp():
      hist = try_permute(turns=turns, pos=pos, ori=new_ori, ch=ch.next(), po=po + "   ")
      if hist is not None:
         for h in hist:
            possible_histories.append(h)

   return possible_histories

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
