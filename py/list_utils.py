from typing import *

def label(lst: list, labels: Dict[int, str]) -> str:
   output = ""

   # list opens up with a `[`
   chrs_balance = 1
   for i in range(len(lst)):
      chrs_balance += len(repr(lst[i]))
      label = labels.get(i) or ""

      if chrs_balance - len(label) < 0:
         # label is too long
         output += ' ' * chrs_balance
         chrs_balance -= chrs_balance
      else:
         output += ' ' * (chrs_balance - len(label))
         chrs_balance -= (chrs_balance - len(label))

         output += label
         chrs_balance -= len(label)

      chrs_balance += len(", ")

   return output
