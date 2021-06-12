from typing import *

T = TypeVar('T')
U = TypeVar('U')

def reconstruct_type(it: T) -> type[T]:
   if it is None:
      return Literal[None]

   t = type(it)

   # First of all, if val is any one of the primitives, return a literal of it.
   # You could consider this the base case for reconstruct_type.
   if (0
      or t is int
      or t is float
      or t is bool
      or t is str
   ): return Literal[it]

   # Now we want to handle some basic collections. You might be looking at
   # elem_ts and thinking "oh no, what about duplicates?" fear not, young one.
   # Union is actually quite smart and will dedupe all type arguments for us.
   # It also acts like identity if there's only one type argument.
   # Thanks, snake Gods. This is a good interface.
   if t is list:
      val_ts = []
      for val in it:
         val_ts.append(reconstruct_type(val))
      return list[Union[tuple(val_ts)]]
 
   if t is set:
      val_ts = []
      for val in it:
         val_ts.append(reconstruct_type(val))
      return set[Union[tuple(val_ts)]]

   if t is dict:
      key_ts = []
      val_ts = []
      for key, val in it.items():
         key_ts.append(reconstruct_type(key))
         val_ts.append(reconstruct_type(val))
      return dict[Union[tuple(key_ts)], Union[tuple(val_ts)]]

   if t is tuple:
      return tuple[tuple(Literal[type(val)] for val in it)]

   # Pylance shouts at me if I don't declare this.
   # Anyways, this is all about allowing other types that I haven't accounted
   # for to deduce their own type arguments. Let's look at an example:
   """
   class Box(Generic[T]):
      def __init__(self, val: T):
         self.val = val

      def get_type_args(self, reconstruct_type: Callable[[Any], type[U]]) -> tuple[U]:
         return tuple(reconstruct_type(self.val))
   """
   G: Any = Generic
   if issubclass(t, G) and hasattr(t, "get_type_args"):
      get_type_args: Callable[[reconstruct_type], tuple[type, ...]] = t.get_type_args
      return t[get_type_args(reconstruct_type)]

   return t

def widen_union(u: Union[T]):
   wide_ts = []
   for t in get_args(u):
      if get_origin(t) is Literal:
         for l in get_args(t):
            wide_ts.append(type(l))
      else:
         wide_ts.append(t)
   return Union[tuple(wide_ts)]


def is_convertible(From: type[T], To: type[U]) -> bool:
   if To is Any:
      return True

   if From == To:
      # Union[str, int] -> Union[int, str]
      # that's why we're using == instead of is
      return True

   from_o = get_origin(From)
   to_o   = get_origin(To)

   if from_o == To:
      # T[int] -> T
      return True

   if from_o is Union:
      for t in get_args(From):
         if not is_convertible(t, To):
            return False
      return True

   if to_o is Union:
      for t in get_args(To):
         if is_convertible(From, t):
            return True
      return False

   if from_o is Literal:
      # Literal[1, 2, 3...] -> int
      # This for loop will always run once because
      # Literal[must have something here]
      for l in get_args(From):
         if not is_convertible(type(l), To):
            return False
      return True

   if to_o is Literal:
      # Literal[1] -> Literal[1, 2, 3...]
      for l in get_args(To):
         if not is_convertible(From, type(l)):
            return False
      return True

   if from_o is None:
      return False
   if to_o is None:
      return False

   if from_o == to_o:
      # T[int, str] -> T[int, str | float]
      from_args = get_args(From)
      to_args   = get_args(To)

      if len(from_args) != len(to_args):
         return False

      for i in range(0, len(from_args)):
         if not is_convertible(from_args[i], to_args[i]):
            return False

      return True

   return False
