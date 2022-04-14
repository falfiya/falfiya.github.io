# does not work in mypy but works in vscode so :shrug:
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
class Cat(Animal):
   is_cat = True
class Dog(Animal):
   is_dog = True
class Car: ...

cat_is_animal = instanceof(Animal).child(Cat())
car_is_animal = instanceof(Animal).child(Car())
car_is_car = instanceof(Car).child(Cat())

class vt(Generic[T]):
   def __init__(self):
      self.v : T = None
      self.t : Type[T] = None

@overload
def NotT(b: Literal[True]) -> vt[Literal[False]]: ...
@overload
def NotT(b: Literal[False]) -> vt[Literal[True]]: ...
def NotT(_): return vt()

@overload
def Choose(cond: Literal[True], a: T, _) -> vt[T]: ...
@overload
def Choose(cond: Literal[False], _, b: T) -> vt[T]: ...
def Choose(*_): return vt()

cat = Choose(NotT(NotT(True).v).v, Dog, Cat).t
cat_intstance: cat = None

cat_intstance.is_dog
