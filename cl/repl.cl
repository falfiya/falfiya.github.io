(loop
   (princ "> ")
   (finish-output)
   (princ (eval (read)))
   (terpri)
   (finish-output))
