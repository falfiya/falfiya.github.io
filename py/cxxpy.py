# templates in python, kinda
# present issues with this
# representing typedefs within python
#     cannot change __base__ of s12n
#     no proper way to have macros
# not threadsafe yet
# typing.Generic does not work. I manually implement __class_getitem__.
from typing import Any, TypeVar, Generic, Type, Callable
from types import BuiltinFunctionType, FunctionType
from threading import Lock
from inspect import *

T = TypeVar('T')

def _global_inject_candidate(fn, /):
   return callable(fn) and not isinstance(fn, BuiltinFunctionType)

def _global_inject(fn: T, injected: dict[str, Any], /) -> T:
   globals = {}
   globals.update(fn.__globals__)
   globals.update(injected)
   cpyfn = FunctionType(
      fn.__code__,
      globals,
      fn.__name__,
      fn.__defaults__,
      fn.__closure__
   )
   if hasattr(fn, "__cxx"):
      return cpyfn()
   else:
      return cpyfn

class _cxxpy_class:
   __cxxpy_lock__    : Lock
   __cxxpy_s13s__    : dict[tuple, type]
   __cxxpy_t_params__: tuple[TypeVar]

_NOCOPY = ("__dict__", "__module__", "__weakref__")
def template(base: T, /) -> T:
   base: _cxxpy_class
   base.__cxxpy_lock__ = Lock()
   base.__cxxpy_lock__.acquire()
   base.__cxxpy_s13s__ = {}
   base.__cxxpy_t_params__ = tuple(base.__parameters__)

   def __class_getitem__(t_args):
      if not isinstance(t_args, tuple):
         t_args = (t_args,)

      base.__cxxpy_lock__.acquire()
      if t_args not in base.__cxxpy_s13s__:
         class s12n:
            ...
         base.__cxxpy_s13s__[t_args] = s12n

         s12n_name = base.__name__ + ", ".join(map(str, t_args))
         s12n.__name__     = s12n_name
         s12n.__qualname__ = s12n_name

         base_dict = vars(base)
         inject: dict[str, Any] = {}
         for i, t_param in enumerate(base.__cxxpy_t_params__):
            name = t_param.__name__
            if name in base_dict:
               computed_t_arg = base_dict[name]
               if not _global_inject_candidate(computed_t_arg):
                  raise TypeError(f"If {s12n_name}.{name} exists, it must be callable!")
               inject[name] = _global_inject(computed_t_arg, inject)()
            else:
               if i <= len(t_args):
                  inject[name] = t_args[i]

         for key, val in base_dict.items():
            if key in _NOCOPY:
               continue
            if key in base.__cxxpy_t_params__:
               continue
            if _global_inject_candidate(val):
               val = _global_inject(val, inject)
            setattr(s12n, key, val)

      ret = base.__cxxpy_s13s__[t_args]
      base.__cxxpy_lock__.release()
      return ret
   base.__class_getitem__ = __class_getitem__
   base.__cxxpy_lock__.release()
   return base

def specialize(base: _cxxpy_class, /, *t_args: list):
   t_args = tuple(t_args)
   def decorator(s12n: type) -> None:
      with base.__cxxpy_lock__:
         if t_args in base.__cxxpy_s13s__:
            raise TypeError(f"Explicit specialization of '{base.__name__}{t_args}' after initialization.")
         base.__cxxpy_s13s__[t_args] = s12n

         s12n_name = base.__name__ + ", ".join(map(str, t_args))
         s12n.__name__     = s12n_name
         s12n.__qualname__ = s12n_name

         s12n_dict = vars(s12n)
         inject: dict[str, Any] = {}
         for i, t_param in enumerate(base.__cxxpy_t_params__):
            name = t_param.__name__
            if name in s12n_dict:
               computed_t_arg = s12n_dict[name]
               if not _global_inject_candidate(computed_t_arg):
                  raise TypeError(f"If {s12n_name}.{name} exists, it must be callable!")
               inject[name] = _global_inject(computed_t_arg, inject)()
               delattr(s12n, name)
            elif i < len(t_args):
               inject[name] = t_args[i]

         for key, potential_method in s12n_dict.items():
            if _global_inject_candidate(potential_method):
               setattr(s12n, key, _global_inject(potential_method, inject))
         return True
   return decorator

container_t = TypeVar("container_t")

@template
class Clazz(Generic[T, container_t]):
   def container_t():
      # since this matches the name of the generic parameter, this is run and
      # injected into each method's global scope.
      return list[T]

   def print():
      print(f"non-specialized Clazz[{T = }, {container_t = }]")

@specialize(Clazz, int)
class _:
   def print():
      print(f"specialized Clazz[{T = }]")

Clazz[str].print()
Clazz[int].print()
