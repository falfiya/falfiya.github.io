from typing import *

T = TypeVar('T')

def add_next(l: List[T]):
   print("add_next")
   l.append(l[len(l) - 1] + 1)

l = list(range(4))

print(l)
add_next(l)
print(l)
