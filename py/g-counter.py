from typing import *
import uuid

class Counter:
   def __init__(self):
      self.id = uuid.uuid4()
      self.count: Dict[uuid.UUID, int] = {self.id: 0}

   def bump(self):
      self.count[self.id] += 1

   def get_count(self):
      return sum(self.count.values())

   def receive(self, others: Dict[uuid.UUID, int]):
      for id in others:
         if id in self.count:
            self.count[id] = max(self.count[id], others[id])
         else:
            self.count[id] = others[id]

def gossip(a: Counter, b: Counter):
   a.receive(b.count)
   b.receive(a.count)

a = Counter()
b = Counter()

a.bump()
a.bump()

b.bump()

a.bump()

print(f"a is at {a.get_count()}")
print(f"b is at {b.get_count()}")

print("Now gossip")
gossip(a, b)

print(f"a is at {a.get_count()}")
print(f"b is at {b.get_count()}")
