from typing import *
from inspect import signature, Parameter
from type_traits import reconstruct_type, is_convertible

class candidate_fn:
   def __init__(self, fn: Callable, sig: tuple[type, ...]):
      self.fn  = fn
      self.sig = sig

__multiple_dispatch__: dict[str, list[candidate_fn]] = {}

def dispatch_for(fn_name: str):
   def dispatcher(*args_in):
      argc = len(args_in)
      in_types = [reconstruct_type(t) for t in args_in]

      for candidate in __multiple_dispatch__[fn_name]:
         print(f"try {candidate.sig}")
         for i in range(0, argc):
            if not is_convertible(in_types[i], candidate.sig[i]):
               print(f"{in_types[i]} is not convertable to {candidate.sig[i]}")
               break
         else:
            print("found")
            return candidate.fn(*args_in)

      raise TypeError(f"No matching function for {fn_name}({in_types})")

   return dispatcher

def multiple_dispatch(fn: Callable):
   if not fn.__name__ in __multiple_dispatch__:
      __multiple_dispatch__[fn.__name__] = []

   param_ts: list[type] = []
   for param in signature(fn).parameters.values():
      if param.kind in (Parameter.KEYWORD_ONLY, Parameter.VAR_KEYWORD, Parameter.VAR_KEYWORD):
         raise NotImplementedError("Cannot handle kwargs or varargs!")
      if param.annotation is Parameter.empty:
         param_ts.append(Any)
      else:
         param_ts.append(param.annotation)

   __multiple_dispatch__[fn.__name__].append(candidate_fn(fn, tuple(param_ts)))

   return dispatch_for(fn.__name__)
