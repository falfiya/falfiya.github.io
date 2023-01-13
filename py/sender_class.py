class Sender:
   state = []
   def send(self, val):
      self.state.append(val)

sender = Sender()
send = sender.send

send("hello")
send(", ")
send("world")

print(sender.state)
