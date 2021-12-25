(defun curry-n (fn n)
   (defun arg-closure (prev-args)
      (if (= n (length prev-args))
         (apply fn prev-args)
         (lambda (&rest args)
            (arg-closure (append prev-args args)))))
   (arg-closure nil))

; I dunno how to fix this
(defmacro curry (sym n)
   `(defparameter ,sym (curry-n ',sym ,n)))

(defun add-print (a b) (princ (+ a b)))

(curry add-print 2)


