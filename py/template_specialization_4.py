# template specialization that might actually make sense to pythonistas
from typing import *

T = TypeVar('T')

Ops_s13s = {}

class Ops_int:
   @staticmethod
   def add(a: int, b: int) -> int:
      return a + b
Ops_s13s[int] = Ops_int
@overload
def Ops(T: Type[int]) -> Type[Ops_int]: ...

class Ops_str:
   @staticmethod
   def add(a: str, b: str) -> str:
      return f"{a} {b}"
   @staticmethod
   def exclaim(s: str) -> str:
      return f"{s}!"
Ops_s13s[str] = Ops_str
@overload
def Ops(T: Type[str]) -> Type[Ops_str]: ...

def Ops(T: None) -> None:
   return Ops_s13s[T]

Ops(int).add(1, 2)
# Ops(int).exclaim("Hello") does not work
Ops(str).exclaim("Hello")
