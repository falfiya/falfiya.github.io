# templates in python, kinda
from typing import Any, TypeVar, Generic
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
   return FunctionType(
      fn.__code__,
      globals,
      fn.__name__,
      fn.__defaults__,
      fn.__closure__
   )

class _cxxpy_template_class:
   __cxxpy_lock__    : Lock
   __cxxpy_s13s__    : dict[tuple, type]
   __cxxpy_t_params__: tuple[TypeVar]

_NOCOPY = ("__dict__", "__weakref__")

_OBJECT_KEYS = vars(type("object_keys", (object,), {})).keys()

def _specialize(base: _cxxpy_template_class, from_s12n: type, t_args: tuple):
   class s12n:
      ...
   base.__cxxpy_s13s__[t_args] = s12n

   s12n_name = base.__name__ + ", ".join(map(str, t_args))
   s12n.__name__     = s12n_name
   s12n.__qualname__ = s12n_name

   from_dict: dict[str, Any] = {}
   from_dict.update(vars(from_s12n))

   t_args_len = len(t_args)

   inject: dict[str, Any] = {}
   for i, t_param in enumerate(base.__cxxpy_t_params__):
      name = t_param.__name__

      if name in from_dict:
         computed_t_arg = from_dict[name]
         if not _global_inject_candidate(computed_t_arg):
            raise TypeError(f"If {s12n_name}.{name} exists, it must be callable!")
         inject[name] = _global_inject(computed_t_arg, inject)()
         del from_dict[name]
      elif i < t_args_len:
         inject[name] = t_args[i]

   for key, val in from_dict.items():
      if key.startswith("__cxxpy_"):
         continue
      if key in _NOCOPY:
         continue
      if key in _OBJECT_KEYS:
         continue
      if _global_inject_candidate(val):
         setattr(s12n, key, _global_inject(val, inject))
      else:
         setattr(s12n, key, val)

def template(base: T, /) -> T:
   base: _cxxpy_template_class
   base.__cxxpy_lock__ = Lock()
   with base.__cxxpy_lock__:
      base.__cxxpy_s13s__ = {}
      base.__cxxpy_t_params__ = tuple(base.__parameters__)

      def __class_getitem__(t_args):
         if not isinstance(t_args, tuple):
            t_args = (t_args,)
         with base.__cxxpy_lock__:
            if t_args not in base.__cxxpy_s13s__:
               _specialize(base, base, t_args)
            ret = base.__cxxpy_s13s__[t_args]
         return ret
      base.__class_getitem__ = __class_getitem__
   return base

def specialize(base: _cxxpy_template_class, t_args: list, /):
   t_args = tuple(t_args)
   def decorator(s12n: type) -> None:
      with base.__cxxpy_lock__:
         if t_args in base.__cxxpy_s13s__:
            raise TypeError(f"Explicit specialization of '{base.__name__}{t_args}' after initialization.")
         _specialize(base, s12n, t_args)
   return decorator

def forward_declare(cls: T) -> T:
   cls.__cxxpy_forward_declare__ = True
   return cls

def implement(cls):
   if not hasattr(cls, "__cxxpy_forward_declare__"):
      raise TypeError("Implementation on class not declared with @forward_declare.")
   def decorator(impl: T) -> T:
      from key, val in vars(impl)
   return decorator

# demo code
T = TypeVar('T')
container_t = TypeVar("container_t")

@template
class Clazz(Generic[T, container_t]):
   container_t = lambda: list[T]
   def print():
      print(f"non-specialized Clazz[{T}, {container_t}]")

@specialize(Clazz, [int])
class _:
   container_t = lambda: tuple[T]
   def print():
      print(f"specialized Clazz[{T}, {container_t}]")

Clazz[str].print()
Clazz[int].print()
