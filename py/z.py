from z3 import *

x = Int('x')
z = x * 2
y = z / 2
prove(x == y)
