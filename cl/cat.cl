(let ((fd (open "cat.cl")) line)
   (loop
      (setf line (read-line fd nil))
      (if (null line) (return))
      (princ line)
      (princ #\newline)))
(exit)
