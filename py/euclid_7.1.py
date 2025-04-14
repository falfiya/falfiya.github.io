def coprime(a: int, b: int) -> bool:
   """
   FUCK THIS GAY ASS ALGO
   """
   less = min(a, b)
   acc = max(a, b)
   the_one_before = acc

   if less < 0:
      raise ValueError("Cannot do negatives idk")

   while True:
      print(f"{acc=} {less=}")
      if acc < less:
         break
      the_one_before = acc
      acc -= less

   the_one_left = acc
   if the_one_left == 1:
      return True
   if the_one_left == 0:
      return False

   while True:
      print(f"{the_one_before=} {the_one_left=}")
      if the_one_before < the_one_left:
         break
      the_one_before -= the_one_left

   return the_one_before == 1

print("Check if two ints are coprime!\n")
a = int(input("a = "))
b = int(input("b = "))
if coprime(a, b):
   print(f"{a} and {b} are coprime!")
else:
   print(f"{a} and {b} are not coprime :(")
