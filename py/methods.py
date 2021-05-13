class Cat:
   name: str

   def __init__(self, name: str):
      self.name = name

   def method_a(arg):
      print(f"{arg = }")

   def method_b(self, arg):
      print(f"{self = }, {arg = }")

thumper = Cat("Thumper")
thumper.method_a()
thumper.method_b("world")
