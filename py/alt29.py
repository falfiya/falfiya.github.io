import ctypes

def deref(addr, typ):
   return ctypes.cast(addr, ctypes.POINTER(typ))

deref(id(29), ctypes.c_int)[6] = 100

print(1 + 28)
