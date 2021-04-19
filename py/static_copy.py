class Clazz:
   field = 0
   def method(self):
      print("Hello!")

print(f"Clazz::field - {Clazz.field}")
print(f"Clazz::field = 42")
print(f"Clazz##field - {Clazz().field}")
print(f"Clazz##method()")
Clazz().method()
print(f"Clazz::method = lambda self : print('Goodbye!'")
Clazz.method = lambda self : print("Goodbye")
print(f"Clazz##method()")
Clazz().method()
