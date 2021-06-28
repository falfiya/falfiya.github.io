from typing import *
from multiple_dispatch import multiple_dispatch

@overload
@multiple_dispatch
def add(a: Literal[4, 6, 8], b):
   raise TypeError("No adding 2, 4, 6, or 8!")

@overload
@multiple_dispatch
def add(a: int, b: str):
   return f"int + str = {a} + {b}"

@overload
@multiple_dispatch
def add(a: int, b: int):
   return a + b

@multiple_dispatch
def add(a, b):
   return f"Any + Any = {a} + {b}"

print(add(2, "hello"))
