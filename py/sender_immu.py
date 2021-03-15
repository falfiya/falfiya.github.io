def Sender(ary = []):
   def Send(val):
      if (val is None):
         return ary
      return Sender(ary + [val])
   return Send

send = Sender()

print(send("hello")(", ")("world"))
