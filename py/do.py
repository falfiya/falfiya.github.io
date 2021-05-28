from typing import *

T = TypeVar('T')

def do(proc: Callable[[], T]) -> T:
   return proc()

@do
def one_thousand():
   return 10 * 10 * 10

print(one_thousand)
