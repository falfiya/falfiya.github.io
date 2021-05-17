i = 0

def __getattr__(_):
   print("iota")
   global i
   i += 1
   return i
