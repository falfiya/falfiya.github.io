from typing import *

T = TypeVar('T')

from termcolor import colored

class color_int:
   def __init__(self, val: int, color: str):
      self.val = val
      self.color = color

   def __repr__(self):
      return colored(self.val, self.color)

   def __lt__(self, other: int):
      return self.val < other

   def __gt__(self, other: int):
      return self.val > other

   def __eq__(self, other: int):
      return self.val == other
