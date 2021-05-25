from types import MethodType
from typing import *
import operator as op

T = TypeVar('T')

class imut:
   def __new__(cls, val):
      if isinstance(val, imut):
         return val
      return object.__new__(cls)

   def __init__(self, val):
      def get_val(self):
         return val
      self.get_val = MethodType(get_val, self)
      # operator overloads

   def binop_wrap(fn: T) -> T:
      def wrapped(self, o):
         val = self.get_val()
         if isinstance(o, imut):
            return fn(val, o.get_val())
         else:
            return fn(val, o)
      return wrapped

   __lt__ = binop_wrap(op.lt)
   __le__ = binop_wrap(op.le)
   __eq__ = binop_wrap(op.eq)
   __ne__ = binop_wrap(op.eq)
   __ge__ = binop_wrap(op.ge)
   __gt__ = binop_wrap(op.gt)

   __or__  = binop_wrap(op.or_ )

   __not__ = binop_wrap(op.not_)
   __add__ = binop_wrap(op.and_)
   __abs__ = binop_wrap(op.abs )
   __mod__ = binop_wrap(op.mod )
   __mul__ = binop_wrap(op.mul )
   __sub__ = binop_wrap(op.sub )
   __xor__ = binop_wrap(op.xor )
   __pow__ = binop_wrap(op.pow )

   __lshift__ = binop_wrap(op.lshift)
   __rshift__ = binop_wrap(op.rshift)

   __matmul__ = binop_wrap(op.matmul)
   __truediv__ = binop_wrap(op.truediv)
   __floordiv__ = binop_wrap(op.floordiv)

   def __neg__(self): return -self.get_val()
   def __pos__(self): return +self.get_val()

   def __index__(self): return self.get_val().__index__()
   def __invert__(self): return ~self.get_val()

   def __str__(self): return str(self.get_val())
   def __repr__(self): return repr(self.get_val())

   def __bool__(self): return bool(self.get_val())
   def __hash__(self): return hash(self.get_val())

   def __bytes__(self): return bytes(self.get_val())
   def __format__(self): return format(self.get_val())

   def __getattr__(self, name: str):
      return getattr(self.get_val(), name)

   def __setattr__(self, name: str, value: Any):
      if name == get_val
      setattr(self.get_val(), name, value)

   def __delattr__(self, name):
      delattr(self.get_val(), name)

   def __dir__(self): return dir(self.get_val())

b = imut(1) + imut(2)
print(b)
