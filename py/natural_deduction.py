from __future__ import annotations
import typing as t
import re
import functools

T = t.TypeVar("T")

def Var(v: str) -> str:
   """
   Decide which things are valid variable names.

   --------- Var Intro
   $v :: Var
   """

   if re.match(r"(?:\?_|[A-Za-z])\w*$", v):
      return f"{v} :: Var"
   else:
      raise ValueError("VarIntro failed")

def VarExpr(var_x: str) -> str:
   """
   All variables are expressions.

   $v :: Var
   ---------- Var
   $v :: Expr
   """

   m_x = re.match(r"(.+) :: Var", var_x)
   if m_x is None:
      raise ValueError("Var failed")

   x = m_x.group(1)
   return f"({x}) :: Expr"

def Abs(var_x: str, expr_body: str) -> str:
   """
   Add syntax for making functions.

   $x :: Var            $body :: Expr
   ----------------------------------
         (λ$x -> $body) :: Expr
   """
   m_x = re.match(r"(.+) :: Var$", var_x)
   m_body = re.match(r"(.+) :: Expr$", expr_body)
   if m_x is None or m_body is None:
      raise ValueError("Abs failed")

   x = m_x.group(1) or m_x.group(2)
   body = m_body.group(1)
   return f"(λ{x} -> {body}) :: Expr"

def App(expr_e1: str, expr_e2: str) -> str:
   """
   Add syntax for calling functions

   $e1 :: Expr           $e2 :: Expr
   ------------------------------- App Intro
         ($e1 $e2) :: Expr
   """
   m_e1 = re.match(r"(.+) :: Expr$", expr_e1)
   m_e2 = re.match(r"(.+) :: Expr$", expr_e2)
   if m_e1 is None or m_e2 is None:
      raise ValueError("App failed")

   e1 = m_e1.group(1)
   e2 = m_e2.group(1)
   return f"({e1} {e2}) :: Expr"

print("Demonstration of Rules:")
print(
   Abs(Var("x"),
      App(
         VarExpr(Var("x")),
         VarExpr(Var("x")))))

print(
   App(
      Abs(Var("x"),
         App(
            VarExpr(Var("x")),
            VarExpr(Var("x")))),
      Abs(Var("x"),
         App(
            VarExpr(Var("x")),
            VarExpr(Var("x"))))))

def memoize(fn: T) -> T:
   in_flight = set()
   error = {}
   result = {}
   def watcher(arg):
      if arg in error:
         raise error[arg]
      if arg in in_flight:
         error[arg] = ValueError("No progress")
         raise error[arg]
      if arg in result:
         return result[arg]
      try:
         in_flight.add(arg)
         result[arg] = fn(arg)
         in_flight.remove(arg)
         return result[arg]
      except Exception as e:
         error[arg] = e
         raise error[arg]
   setattr(watcher, "__name__", fn.__name__)
   return watcher

@memoize
def App_Inverse(app: str) -> list[list[str]]:
   m_app = re.match(r"^\(\((.+)\) \((.+)\)\) :: Expr$", app)
   if m_app is None:
      raise ValueError("App inverse failed")
   app = app[1:-len(") :: Expr")]

   possibilities = []
   for splitpoint in (i for i, c in enumerate(app) if c == ' '):
      e1 = app[:splitpoint].strip()
      e2 = app[splitpoint:].strip()
      expr_e1 = f"({e1}) :: Expr"
      expr_e2 = f"({e2}) :: Expr"
      possibilities.append([expr_e1, expr_e2])
   return possibilities

@memoize
def Abs_Inverse(abs: str) -> list[list[str]]:
   m_abs = re.match(r"^\(λ(.+) -> (.+)\) :: Expr$", abs)
   if m_abs is None:
      raise ValueError("Abs inverse failed")

   var_x = f"{m_abs.group(1).strip()} :: Var"
   expr_body = f"{m_abs.group(2).strip()} :: Expr"
   return [[var_x, expr_body]]

@memoize
def VarExpr_Inverse(expr_x: str) -> list[list[str]]:
   m_var = re.match(r"^\((.+)\) :: Expr$", expr_x)
   if m_var is None:
      raise ValueError("VarExpr inverse failed")

   var_x = f"{(m_var.group(1) or m_var.group(2)).strip()} :: Var"
   return [[var_x]]

@memoize
def Var_Inverse(var_x: str) -> list[list[str]]:
   m_v = re.match(r"^(.+) :: Var$", var_x)
   if m_v is None:
      raise ValueError("Var inverse failed")

   v = m_v.group(1)
   try:
      Var(v)
      return []
   except ValueError:
      raise ValueError(f"Invalid variable {repr(v)}")

def ParenEq(s: str) -> list[list[str]]:
   m_inside = re.match(r"^\((.+)\) :: (.+)$", s)
   if m_inside is None:
      raise ValueError("Parens failed")
   return [[f"{m_inside.group(1).strip()} :: {m_inside.group(2).strip()}"]]

INVERSE_RULES: list[t.Callable[[str], list[list[str]]]] = [
   App_Inverse,
   Abs_Inverse,
   VarExpr_Inverse,
   Var_Inverse,
   ParenEq,
]

@functools.cache
def _prove(s: str) -> list[str]:
   """
   Try every inverse rule ever.

   Returns lines of a proof for s if one exists.
   """
   for r in INVERSE_RULES:
      rule = r.__name__.replace('_Inverse', '')
      try:
         possibilities = r(s)
      except ValueError:
         continue # INVERSE_RULES loop

      if len(possibilities) == 0:
         # Special case: nothing to prove.
         return [f"{s} ⊣ {rule}"]

      for obligations in possibilities:
         proof: list[str] = [f"{s} ⊣ {rule}"]

         try:
            for o in obligations:
               for line in _prove(o):
                  proof.append("   " + line)
         except ValueError:
            continue # possibilities loop
         return proof
   raise ValueError(f"Cannot prove {repr(s)}")

def prove(s: str):
   print("")
   print("\n".join(_prove(s)))

print("\nAutomated Prover:")
prove("(λx -> ((x) (x))) :: Expr")
prove("((λx -> ((x) (x))) (λx -> ((x) (x)))) :: Expr")
