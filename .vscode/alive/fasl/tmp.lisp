(defun read-lines (fd)
   (let ((line (read-line fd nil)))
      (and line (append (list line) (read-lines fd)))))
