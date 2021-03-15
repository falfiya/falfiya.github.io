def Sender():
   def Send(val):
      Send.state.append(val)
      return Send
   Send.state = []
   return Send

send = Sender()

send("hello")
send(", ")
send("world")

print(send.state)
