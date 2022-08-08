from sys import _getframe

def f(s):
   caller_locals = _getframe(1).f_locals
   out = ""
   while s:
      c = s[0]
      s = s[1:]
      if c == "{":
         end = s.index("}")
         out += caller_locals[s[:end]]
         s = s[end + 1:]
      else:
         out += c
   return out

w = "World"
print(f("Hello, {w}!"))
