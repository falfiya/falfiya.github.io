from sympy import *

x, b, c, P, Q, R = symbols("x, b, c, P, Q, R")

f = x**2 + b*x + c

system = [
   Eq(f.subs(x, P), Q),
   Eq(f.subs(x, Q), R),
]

solutions = solve(system, [b, c])
print(latex(Eq(b, solutions[b].simplify())))
print(latex(Eq(c, solutions[c].simplify())))
print(f)
