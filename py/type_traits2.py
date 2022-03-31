from typing import *

T = TypeVar('T')



class instanceof(Generic[T]):
   def __init__(self, parent: Type[T]):
      self.parent = parent
   @overload
   def child(self, child: T) -> Type[Literal[True]]: ...
   @overload
   def child(self, any) -> Type[Literal[False]]: ...
   def child(self, child):
      return isinstance(child, self.parent)

class Animal: ...
class Cat(Animal): ...
class Car: ...

cat_is_animal = instanceof(Animal).child(Cat())
car_is_animal = instanceof(Animal).child(Car())
car_is_car = instanceof(Car).child(Cat())

# todo, completely type level one?

@overload
def NotT(b: Literal[True]) -> Type[Literal[False]]: ...
@overload
def NotT(b: Literal[False]) -> Type[Literal[True]]: ...

a: NotT[True]

def takes_false(false: a): ...

takes_false(1)
