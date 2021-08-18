# aka forwards declarations
from typing import Type, TypeVar
from sys import _getframe

T = TypeVar('T')

class Foo:
   ...

foo_ref = Foo

def impl(cls: Type[T]) -> Type[T]:
   name = cls.__name__
   caller_locals = _getframe(1).f_locals
   if name in caller_locals:
      actual = caller_locals[name]
      for k, v in cls.__dict__.items():
         if k != "__dict__":
            setattr(actual, k, v)
      return actual
   else:
      return cls

@impl
class Foo:
   def bar():
      print(":powerscrunge:")

print(f"{Foo == foo_ref = }")
Foo.bar()
