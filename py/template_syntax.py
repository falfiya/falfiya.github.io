from typing import *

T = TypeVar('T')
generic_t = TypeVar('generic_t')
clazz_t   = TypeVar('clazz_t')
real_t    = TypeVar('real_t')

_ = object()

class of(Generic[real_t, clazz_t]):
   def __init__(self, t: type[real_t]):
      self.clazz: clazz_t
      self.type = t
      self.args = []

   def __gt__(self, o: Any) -> clazz_t:
      if type(o) is tuple:
         return self.clazz[self.type](*o)
      if o is _:
         return self.clazz[self.type]

class generic_class(Generic[clazz_t, generic_t]):
   def __init__(self, clazz: type[clazz_t], typevar: generic_t):
      self.clazz   = clazz
      self.typevar = typevar

   def __lt__(self, of: of[real_t, clazz_t]):
      of.clazz = self.clazz
      return True

class typename(Generic[generic_t]):
   def __init__(self, t: generic_t, /):
      self.type = t

   def __gt__(self, _):
      def generic_class_decorator(clazz: type[clazz_t]):
         return generic_class(clazz, self.type)
      return generic_class_decorator

class template_literal:
   def __lt__(self, t):
      return t

template = template_literal()

@template<typename(T)>_
class count_print(Generic[T]):
   def __init__(self, count: T, noun: str):
      self.count = count
      self.noun  = noun

   def print_info(self):
      print(f"count: {type(self.count)} = {self.count}")
      print(f"noun: {type(self.noun)} = {self.noun}")

c = count_print<of(int)>(5, "cat")
c.print_info()
