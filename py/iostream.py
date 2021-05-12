from __future__ import annotations
import io
import sys
from typing import *

def endl(ostream):
   ostream.file.write('\n')
   ostream.file.flush()

class basic_ostream:
   file: io.TextIOBase
   def __init__(self, file: io.TextIOBase):
      self.file = file

   def __lshift__(self, val) -> basic_ostream:
      if val is endl:
         endl(val)
      else:
         self.file.write(val)
      return self

cout = basic_ostream(sys.stdout)

cout << "Hello, World" << endl
