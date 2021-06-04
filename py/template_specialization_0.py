from __future__ import annotations
from typing import *

T = TypeVar('T')

class Adder(Generic[T]):
   specializations = {}
   def __class_getitem__(cls, type) -> Adder[T]:
      if type in cls.specializations:
         return cls.specializations[type]
      else:
         return cls

   @staticmethod
   def add(a: T, b: T) -> T:
      return a + b

class Adder_Int:
   @staticmethod
   def add(a: int, b: int):
      return a - b

Adder.specializations[int] = Adder_Int

gen_adder = Adder()
str_adder = Adder[str]()
int_adder = Adder[int]()

print(f"{gen_adder.add(60, 40)         = }")
print(f"{int_adder.add(60, 40)         = }")
print(f"{gen_adder.add('gar', 'field') = }")
print(f"{str_adder.add('gar', 'field') = }")
