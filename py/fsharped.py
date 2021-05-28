from __future__ import annotations
from typing import *
import operator as op

T = TypeVar('T')
U = TypeVar('U')
V = TypeVar('V')

def binop_wrap(fn: Callable[[T, U], V]):
   def wrapped(self: fsharped[T], o: Union[fsharped[U], U]):
      if isinstance(o, fsharped):
         o = o.__val__
      return fsharped.make(fn(self.__val__, o))
   return wrapped

class fsharped(Generic[T]):
   @staticmethod
   def make(val: T) -> fsharped[T]:
      if isinstance(val, fsharped):
         return val
      else:
         return fsharped(val)

   def __init__(self, val: T):
      self.__val__ = val
      # operator overloads

   __lt__ = binop_wrap(op.lt)
   __le__ = binop_wrap(op.le)
   __eq__ = binop_wrap(op.eq)
   __ne__ = binop_wrap(op.eq)
   __ge__ = binop_wrap(op.ge)
   __gt__ = binop_wrap(op.gt)

   __or__ = binop_wrap(op.or_)

   __not__ = binop_wrap(op.not_)
   __add__ = binop_wrap(op.and_)
   __abs__ = binop_wrap(op.abs )
   __mod__ = binop_wrap(op.mod )
   __mul__ = binop_wrap(op.mul )
   __sub__ = binop_wrap(op.sub )
   __xor__ = binop_wrap(op.xor )
   __pow__ = binop_wrap(op.pow )

   __lshift__ = binop_wrap(op.lshift)
   # __rshift__ = binop_wrap(op.rshift)

   __matmul__ = binop_wrap(op.matmul)
   __truediv__ = binop_wrap(op.truediv)
   __floordiv__ = binop_wrap(op.floordiv)

   def __neg__(self):
      return -self.__val__

   def __pos__(self):
      return +self.__val__

   def __index__(self):
      return self.__val__.__index__()

   def __invert__(self):
      return ~self.__val__

   def __str__(self):
      return self.__val__.__str__()

   def __repr__(self):
      return self.__val__.__repr__()

   def __bool__(self):
      return bool(self.__val__)

   def __hash__(self):
      return hash(self.__val__)

   def __bytes__(self):
      return bytes(self.__val__)
   def __format__(self, *_):
      return format(self.__val__)

   def __getattr__(self, name: str):
      return getattr(self.__val__, name)

   # def __setattr__(self, name: str, value: Any):
   #    setattr(self.__val__, name, value)

   def __delattr__(self, name):
      delattr(self.__val__, name)

   def __dir__(self):
      return dir(self.__val__)

   def __getitem__(self, key):
      return self.__val__[key]

   # apply
   def __matmul__(self, fn: Callable[[T], V]) -> fsharped[V]:
      return fsharped.make(fn(self.__val__))

   def __call__(self, *psargs, **kwargs):
      return fsharped.make(self.__val__(*psargs, **kwargs))
