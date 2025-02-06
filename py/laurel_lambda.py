# what is true if?
# true.apply(1).apply(2) == 1
# Author: Laurel

class FirstTry:
   x: int | None = None
   def apply(self, y: int):
      if self.x is None:
         self.x = y
         return self
      else:
         return self.x

true1 = FirstTry()
assert true1.apply(1).apply(2) == 1, "failed!"

class SecondTry:
   """
   Let's do it without mutation
   """
   def apply(self, y: int):
      class Inner:
         x: int = y
         def apply(self, _):
            return self.x
      return Inner()

true2 = SecondTry()
assert true2.apply(1).apply(2) == 1, "failed!"

class ThirdTry:
   """
   Simplify
   """
   def apply(self, y: int):
      class Inner:
         def apply(self, _):
            return y
      return Inner()

true3 = SecondTry()
assert true3.apply(1).apply(2) == 1, "failed!"

class FourthInner:
   def __init__(self, y: int):
      self.y = y

   def apply(self, _):
      return self.y

class FourthTry:
   def apply(self, y: int):
      return FourthInner(y)

true4 = SecondTry()
assert true4.apply(1).apply(2) == 1, "failed!"
