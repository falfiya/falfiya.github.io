from typing import *

T = TypeVar("T")

class ptr(Generic[T]):
   __slots__ = "__value__"
   def __init__(self, value: T):
      self.__value__ = value

   def __mul__(self, other: T) -> Self:
      self.__value__ = other
      return self

   def __iter__(self) -> Iterator[T]:
      eager = self.__value__
      yield eager

x = ptr(1)
print(*x)
x *= 2
print(*x)
