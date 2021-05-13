from typing import *

T = TypeVar('T')

class Box(Generic[T]):
   def __lshift__(self, val: T):
      self.val = val

   def __init__(self, val: T):
      self.val = val

   def __repr__(self):
      return f"Box({repr(self.val)})"
