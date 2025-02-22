import dis
import inspect

def nomadic():
   """
   Unfortunately this doesn't work in all contexts but it's pretty flexible
   """
   this_frame = inspect.currentframe()
   caller_frame = this_frame.f_back
   # this is the offset of the instruction that called me
   my_call_offset = caller_frame.f_lasti
   instructions = [*dis.get_instructions(caller_frame.f_code)]

   prev_i = None
   for i in instructions:
      if i.offset == my_call_offset:
         break
      prev_i = i
   else:
      raise SystemError("Could not find the instruction where I was called!")

   print(f"Hello from {my_name}")

   if prev_i.opname == "LOAD_NAME":
      my_name = prev_i.argval
      
   else:
      # This sucks. We were hoping that something like nomadic() was called, but
      # it wasn't.
      # We'll go through and check all variable bindings 
      raise SystemError("The instruction before this function call must be a LOAD_NAME instruction!")

   my_name: str = this_frame.f_code.co_name
   my_number = int("0" + my_name[len("nomadic"):])

   print(f"Hello from {my_name}")

   caller_frame = this_frame.f_back.f_locals
   me = caller_frame[my_name]
   del caller_frame[my_name]
   my_next_name: str = f"nomadic{my_number + 1}"
   caller_frame[my_next_name] = me

nomadic0()
nomadic1()
