(defun sum (L)
   (if L
      (+ (car L) (sum (cdr L)))
      0
   )
)
