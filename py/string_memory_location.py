def info():
   global a, b
   print(f"{a = }, {b = }")
   print(f"{a == b = }")
   print(f"{a is b = }")

a = "hello"
b = "hello"
info()

a += "o"
b += "o"
info()

a = "hello"
b = "hell" + 'o'
info()

o = 'o'
a = "hello"
b = "hell" + o
info()
