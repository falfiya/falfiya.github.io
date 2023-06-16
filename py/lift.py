from typing import *

T = TypeVar("T")
U = TypeVar("U")
V = TypeVar("V")

def add(a: int, b: int) -> int:
   return a + b

# :(
def lift(fn: Callable[[T, U], V]) -> Callable[[List[T], List[U]], List[V]]:
   return lambda la, lb: [fn(a, b) for (a, b) in zip(la, lb)]

addl = lift(add)
