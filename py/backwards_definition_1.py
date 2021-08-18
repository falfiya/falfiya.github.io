# aka forwards declarations
from typing import Type, TypeVar

T = TypeVar('T')

def implement(actual):
   def decorator(cls: Type[T]) -> Type[T]:
      for k, v in cls.__dict__.items():
         if k != "__dict__":
            setattr(actual, k, v)
      return actual
   return decorator

class Foo:
   ...

foo_ref = Foo

@implement(Foo)
class Foo:
   def bar():
      print(":powerscrunge:")

print(f"{Foo == foo_ref = }")
Foo.bar()
