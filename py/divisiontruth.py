from fishhook import hook, orig

@hook(int)
def __truediv__(self, __x):
   if __x == 0:
      return 3
   else:
      return orig(self, __x)

print(13 / 0)
