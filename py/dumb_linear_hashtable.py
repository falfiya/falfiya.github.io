from typing import *

T = TypeVar('T')

class element(Generic[T]):
   def __init__(self, key_hash: int, val: T):
      self.key_hash = key_hash
      self.val = val

   def __repr__(self):
      return f"#{self.key_hash}->{self.val}"

class bucket(Generic[T]):
   def __init__(self):
      self.empty_since_start   = True
      self.element: element[T] = None

   def __repr__(self):
      if self.empty_since_start:
         return "<empty>"
      elif self.element is None:
         return "*empty*"
      else:
         return f"[{self.element}]"

class dumb_linear_hashtable(Generic[T]):
   def __init__(self, size = int):
      self.size = size
      self.data = [bucket() for _ in range(0, size)]

   def __getitem__(self, key: Hashable):
      h = hash(key)
      b = h % self.size
      i = b
      while True:
         B = self.data[i]
         if B.element is None and B.empty_since_start:
            return None

         if B.element.key_hash == h:
            return B.element.val

         i += 1
         i %= self.size
         if i == b:
            return None

   def __setitem__(self, key: Hashable, val: T):
      h = hash(key)
      b = h % self.size
      i = b
      while True:
         B = self.data[i]
         if B.element is None:
            B.element = element(h, val)
            B.empty_since_start = False
            return

         if B.element.key_hash == h:
            B.element = element(h, val)
            B.empty_since_start = False
            return

         i += 1
         i %= self.size
         if i == b:
            raise ValueError("Not enough room for the new element!")

   def __delitem__(self, key: Hashable):
      h = hash(key)
      b = h % self.size
      i = b
      while True:
         B = self.data[i]
         if B.element is None and B.empty_since_start:
            return None
         elif B.element.key_hash == h:
            val = B.element.val
            B.element = None
            return val

         i += 1
         i %= self.size
         if i == b:
            return None

doct = dumb_linear_hashtable(10)

doct["hello"]  = "world"
doct["suffer"] = "you"
doct["but"]    = "why?"

print(f"{doct['suffer']} suffer but {doct['but']}")
