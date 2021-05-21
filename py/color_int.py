from __future__ import annotations
from typing import *
from termcolor import colored

T = TypeVar('T')


class color_int:
   def __init__(self, val: int, color: str):
      self.val = val
      self.color = color

   def __repr__(self):
      return colored(self.val, self.color)

   def __lt__(self, other: color_int):
      return self.val < other.val

   def __gt__(self, other: color_int):
      return self.val > other.val

   def __eq__(self, other: color_int):
      return self.val == other.val
