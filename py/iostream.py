from __future__ import annotations
import io
import sys
from typing import *

def endl(ostream: basic_ostream):
   ostream.file.write('\n')
   ostream.file.flush()

class basic_ostream:
   def __init__(self, file: io.TextIOBase):
      self.file: io.TextIOBase = file

   def __lshift__(self, val) -> basic_ostream:
      if val is endl:
         endl(self)
      else:
         self.file.write(val)
      return self

cout = basic_ostream(sys.stdout)

cout << "Hello, World" << endl
