import random

def r():
   return random.randint(-2_147_483_648, 2_147_483_647)

nums = [r() for _ in range(0, 1000000)]

import time

print("generated integers")

start = time.time()

z = ""

for _ in nums:
   z += str(r())

print(z)

print(time.time() - start)

input()
