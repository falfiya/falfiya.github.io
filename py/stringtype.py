from typing import *

T = TypeVar('T')

times_called = 0

class Gen(Generic[T]):
   def __class_getitem__(*_):
      global times_called
      times_called += 1
      print("Gen[] has been called", times_called, "times")

good: Gen[int]
# marcus figured this one out
huh: Gen["int"]
holy: "Gen[int]"
scrange: "Gen['int']"
