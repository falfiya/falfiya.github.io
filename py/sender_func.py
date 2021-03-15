def Sender(ary = []):
   def Send(val):
      if (val is None):
         return ary
      ary.append(val)
      return Send
   return Send

send = Sender()

send("hello")
send(", ")
send("world")

print(send(None))
