from __future__ import annotations
from typing import *
from abc import abstractmethod

T = TypeVar('T')

class Template:
   def __init_subclass__(cls):
      cls.__template_specializations__ = {}

   def __class_getitem__(cls, type):
      if type in cls.__template_specializations__:
         return cls.__template_specializations__[type]
      else:
         class Templated(cls):
            __template_super__ = cls
            __template_type__  = type
            def __init_subclass__(self):
               self.__template_super__.__template_specializations__[self.__template_type__] = self
         return Templated

class Operations(Template, Generic[T]):
   @staticmethod
   @abstractmethod
   def add(a: T, b: T) -> T:
      ...

class Operations_int(Operations[int]):
   @staticmethod
   def add(a: int, b: int) -> int:
      return a + b

class Operations_str(Operations[str]):
   @staticmethod
   def add(a: str, b: str) -> str:
      return f"{a} {b}"

op_int = Operations[int]()
op_str = Operations[str]()

print(f"{op_int.add(13, 56)           = }")
print(f"{op_str.add('hello', 'world') = }")

def add(a: T, b: T):
   op = Operations[type(a)]()
   print(f"{op.add(a, b) = }")

add("hello", "world")
add(1, 2)
