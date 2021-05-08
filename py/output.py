import sys
from io import StringIO

buf: StringIO

def buffer():
   global buf
   buf = StringIO()
   sys.stdout = buf

def flush():
   global buf
   val = buf.getvalue()
   close()
   print(val)

def close():
   global buf
   sys.stdout = sys.__stdout__
   buf.close()
   buf = None
