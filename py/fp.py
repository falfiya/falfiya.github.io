import operator as op
from curry import curry as c, __
from fsharped import fsharped as f

add = f(op.add) >> c
sub = f(op.sub) >> c

plus_four = add(5) @ sub(__, 2) @ add(1)

f(1) >> plus_four >> print
