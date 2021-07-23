caller:
   push ebp
   mov  ebp, esp
   push 3
   push 2
   push 1
   call callee
   add  esp, 12
