from typing import *
import dis
import inspect

T = TypeVar('T')

class ptr(Generic[T]):
   _: T
   type: Any

   def __init__(self, obj, attr: str, type = None):
      object.__setattr__(self, "_obj", obj)
      object.__setattr__(self, "_attr", attr)
      object.__setattr__(self, "_type", type)

   def __getattribute__(self, attr: str) -> T:
      if attr == "_":
         return object.__getattribute__(self, "_obj")[object.__getattribute__(self, "_attr")]
      elif attr == "type":
         return object.__getattribute__(self, "_type")
      else:
         raise AttributeError(f"Cannot get {attr} on ptr!")

   def __setattr__(self, attr: str, new: T) -> None:
      if attr != "_":
         raise AttributeError(f"Cannot set {attr} on ptr!")
      object.__getattribute__(self, "_obj")[object.__getattribute__(self, "_attr")] = new

def get_arg_ptr(argidx: int) -> ptr[Any]:
   callercaller = inspect.currentframe().f_back.f_back
   that_call = callercaller.f_lasti
   instructions = [*dis.get_instructions(callercaller.f_code)]
   i = 0
   while i < len(instructions):
      current = instructions[i]
      if current.offset == that_call:
         break
      i += 1
   else:
      raise SystemError("Could not find instruction or something")
   load_name = instructions[i - 1 - argidx]
   if load_name.opname != "LOAD_NAME":
      raise SystemError("Previous instruction to this function call must be LOAD_NAME!")
   name = load_name.argval
   annotations = callercaller.f_locals["__annotations__"]
   type = None
   if name in annotations:
      type = annotations[name]
   return ptr(callercaller.f_locals, name, type)

def add1(_: int) -> None:
   a = get_arg_ptr(0)
   a._ += 1

x = 1
add1(x)
print(x)

class basic_istream:
   def __rshift__(self, _):
      var = get_arg_ptr(0)
      var._ = var.type(input())

cin = basic_istream()
a: int = None
b: float = None
cin >> a
print(a)
cin >> b
print(b)
