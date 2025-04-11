from typing import *

T = TypeVar("T")

class LazyValue(Generic[T]):
   def __init__(self, value: T):
      self.__subject__: T = value

   def __add__(self, other):
      

def lazy(smth: ) -> any:
