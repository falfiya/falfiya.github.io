from template_specialization_5_sup import *

@overloadable
def Ops(): ...

class Ops__int:
   def add(a: int, b: int) -> int:
      return a + b

@overload([int], Ops__int)
def Ops(T: Type[int]) -> Type[Ops__int]: ...

class Ops__str:
   def add(a: str, b: str) -> str:
      return f"{a} {b}"
   def exclaim(s: str) -> str:
      return f"{s}!"

@overload([str], Ops__str)
def Ops(T: Type[str]) -> Type[Ops__str]: ...

print(Ops(str).exclaim("Hello, World"))
