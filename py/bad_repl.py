from inspect import signature

def add(a: int, b: int):
   return a + b

my_fns = [add]

while (True):
   line = input("> ").split(" ")

   if len(line) < 1 or line[0] == "help":
      print("available commands:")
      for fn in my_fns:
         print(f"   {fn.__name__}")
      continue

   for fn in my_fns:
      if (fn.__name__ == line[0]):
         i = 1
         args = []
         params = signature(fn).parameters
         for name in params:
            args.append(params[name].annotation(line[i]))
            i += 1
         print(f"< {fn(*args)}")
         break
