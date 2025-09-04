import bisect
import random

list = list(range(0, 20))
random.shuffle(list)

to_insert = list[0]
list = list[8:]
list = sorted(list)

print(list.__class__(range(0, len(list))))
print(list)
print(f"Insert {to_insert} at {bisect.bisect_left(list, to_insert)}")
