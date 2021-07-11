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
   if To is Any or To is object:
      return True

   if From == To:
      # Union[str, int] -> Union[int, str]
      # that's why we're using == instead of is
      return True

   from_o = get_origin(From)
   to_o   = get_origin(To)

   if from_o == To:
      # From: T[...?] -> To: T
      # where 
      return True

   if from_o is Literal:
      # From: Literal -> To: T
      if to_o is Literal:
         # From: Literal -> To: Literal
         #
         # for example:
         # Literal[1, 2] -> Literal[1, 2, 3]
         # {1, 2} is a subset of {1, 2, 3}
         return {*get_args(From)}.issubset({*get_args(To)})
      else:
         # From: Literal -> To: T
         # where T is not Literal
         args = get_args(From)
         if len(args) == 1:
            # From: Literal[A] -> To: T
            # where T is not Literal
            #
            # Convertable
            # where A's class is convertable to T
            return is_convertible(args[0].__class__, To)
         else:
            # From: Literal[...?] -> To: T
            return is_convertible(Union[tuple(Literal[l] for l in args)], To)

   if from_o is Union:
      # From: Union -> To: T
      #
      # Can convert if every element within the union is convertable to T.
      #
      # Side note:
      # From: Union -> To: Union
      #
      # is not as simple as checking if from is a subset of to, unlike literals.
      # Unions always have non-primitives in them which means that each element
      # in From must be convertable to at least one element within To.
      for f in get_args(From):
         if not is_convertible(f, To):
            return False
      return True

   if to_o is Union:
      # From: T -> To: Union
      # where T is not Union
      #
      # Convertable if From is convertable to at least one element in To
      for t in get_args(To):
         if is_convertible(From, t):
            return True
      return False

   if to_o is Literal:
      # From: T -> To: Literal
      # where T is not Literal
      # where T is not Union
      #
      # There are no cases where T would be convertable to a literal type.
      # int -> Literal[1, 2, 3]?
      return False

   # It would be a really silly idea to try to match generic type arguments if
   # either From or To weren't generic.
   if from_o is None:
      return False
   if to_o is None:
      return False

   if from_o == to_o:
      # From: T[...A] -> To: T[...B]
      #
      # for example:
      # dict[str, int] -> dict[str, int | float]
      from_args = get_args(From)
      to_args   = get_args(To)

      if len(from_args) != len(to_args):
         return False

      for (f, t) in zip(from_args, to_args):
         if not is_convertible(f, t):
            return False
      return True

   return False
