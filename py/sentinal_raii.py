def normal():
   try:
      raise ValueError("normal error")
   finally:
      print("normal cleanup")

class sentinal:
   def __init__(self, msg: str):
      self.msg = msg
   def __del__(self):
      print(self.msg)

def with_sentinal():
   defer = sentinal("sentinal cleanup")
   raise ValueError("sentinal error")

try:
   normal()
except ValueError as e:
   print(f"recieved {e}")
try:
   with_sentinal()
except ValueError as e:
   print(f"recieved {e}")

# so looks like C++ RAII doesn't exactly work sequentially since it's whenever
# the object is gc'd but I think it's good enough. if you want some kind of
# defer functionality, you probably just use `with`.
