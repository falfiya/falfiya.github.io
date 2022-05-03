# goal: activate specializations within generics that are non specialized
# right now we either have full generics or only specialization
# it seems that we can't easily mix them
# of course, accessing generics from a specialized class is trivial;
# one simply plugs in the specialized arguments and optionally inherits
# however, doing the reverse, accessing specializations within a generic class
# using typing.Generic, seems to be more challenging.

# when something generic happens, we need some way to get the actual underlaying
# out of the type var and plug it into an overloaded function

from typing import *

T = TypeVar("T")

def generic_fn(t: T) -> T: ...
@overload
def overlod_fn(a: int) -> Literal[1]: ...
@overload
def overlod_fn(a: str) -> Literal[2]: ...
@overload
def overlod_fn(a: Any) -> Literal[3]: "fallback for typing.Generic"

res1 = overlod_fn(generic_fn(1)) #:: Literal[1]
res2 = overlod_fn(generic_fn("")) #:: Literal[2]
res3 = overlod_fn(generic_fn(1.2)) #:: Literal[3]

# irritatingly, it would seem that we'd need to know all of the specializations
# before invoking the generic one

# we're able to do this seemingly quite well with plain functions, what about
# with a generic class?

class generic_cls(Generic[T]):
   def __init__(self, t: T):
      self.type: T = None
      self.res = overlod_fn(t)
   def get_res(self, t: T):
      return overlod_fn(t)

generic_cls("").type #:: str
generic_cls("").res #:: int
generic_cls("").get_res("")
# not so well here
# so while #type is correct, #res is not. Strange behavior
# is there a way we can do generics without having to use this?
# nothing that I can come up with right now, at least
