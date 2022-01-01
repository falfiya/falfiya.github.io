(defun sym-is (sym name) (and (symbolp sym) (equal (symbol-name sym) name)))
(defmacro token! (tok &optional (want (symbol-name tok)))
   `(let ((actual (symbol-name ,tok)))
      (unless (equal ,want actual) (error "Expected token ~F but instead found ~F" ,want actual))))

(defun psh (lst e) (append lst (list e)))
(defmacro psh! (sym e) `(setf ,sym (psh ,sym ,e)))
(defmacro car! (sym) `(let ((fst (car ,sym))) (setf ,sym (cdr ,sym)) fst))

(declaim (ftype function clike-scope))
(defun clike-expr (ts)
   (let (curr out)
      (setf curr (car! ts))

      (if (symbolp curr)
         (cond
            ((and ts (listp (car ts))) (progn
               ; guard for ts = (variable) since (listp (car nil)) is true
               ; function call
               ; +(2 *(4 10))
               ; wanted to pass a list as an argument?
               ; fn(list(1 2 3))
               ; or
               ; fn([ 1 2 3 ])

               (psh! out curr) ; function name

               (let ((args (car! ts)) res-arg)
                  (loop
                     (if (null args)
                        (return))
                     (setf res-arg (clike-expr args))
                     (psh! out (car res-arg))
                     (setf args (cdr res-arg))
                  )
               )
            ))
            ((sym-is (car ts) "[") (progn
               ; list literal
               ; [ 1 2 3 ]
               (psh! out 'list)

               (loop
                  (if (null ts)
                     (error "Expecting closing bracket list literal!~%"))

                  (if (sym-is (car ts) "]")
                     (return))

                  (let ((res-element (clike-expr ts)))
                     (psh! out (car res-element))
                     (setf ts (cdr res-element))
                  )
               )
               (car! ts) ; remove ]
            ))

            ; variable stuff
            ((sym-is (car ts) "=") (progn
               ; assignment
               (car! ts)
               (let ((res-val (clike-expr ts)))
                  (progn
                     (setf out `(setf ,curr ,(car res-val)))
                     (setf ts (cdr res-val))
                  )
               )
            ))
            (t (progn
               ; variable access
               (setf out curr)
            ))
         )

         ; else
         (setf out curr)
      )

      (cons out ts) ; expr in car, excess tokens in cdr
   )
)

(defun clike-let (ts)
   (let (key res-val res-scope)
      (setf key (car! ts))
      (token! (car! ts) "=")

      (setf res-val (clike-expr ts))
      (setf ts (cdr res-val))

      (setf res-scope (clike-scope ts))
      (setf ts (cdr res-scope))

      (cons `(let ((,key ,(car res-val))) ,(car res-scope)) ts)
   )
)

(defun clike-while (ts)
   (let (res-cond res-body)
      (setf res-cond (clike-expr ts))
      (setf ts (cdr res-cond))
      (token! (car! ts) "{")

      (setf res-body (clike-scope ts))
      (setf ts (cdr res-body))
      (token! (car! ts) "}")

      (cons `(loop (unless ,(car res-cond) (return)) ,(car res-body)) ts)
   )
)

(defun clike-if (ts)
   (let (res-cond res-body res-else)
      (setf res-cond (clike-expr ts))
      (setf ts (cdr res-cond))
      (token! (car! ts) "{")

      (setf res-body (clike-scope ts))
      (setf ts (cdr res-body))
      (token! (car! ts) "}")

      (if (sym-is (car ts) "ELSE")
         (progn
            (car! ts)
            (token! (car! ts) "{")
            (setf res-else (clike-scope ts))
            (setf ts (cdr res-else))
            (token! (car! ts) "}")
         )
      )
      (cons `(if ,(car res-cond) ,(car res-body) ,(car res-else)) ts)
   )
)

(defun clike-scope (ts)
   (let ((out `(progn)) res)
      (loop
         (cond
            ((null ts) (progn
               (return)
            ))
            ((sym-is (car ts) "}") (progn
               (return)
            ))
            ((sym-is (car ts) "LET") (progn
               (setf res (clike-let (cdr ts)))
               (psh! out (car res))
               (setf ts (cdr res))
            ))
            ((sym-is (car ts) "WHILE") (progn
               (setf res (clike-while (cdr ts)))
               (psh! out (car res))
               (setf ts (cdr res))
            ))
            ((sym-is (car ts) "IF") (progn
               (setf res (clike-if (cdr ts)))
               (psh! out (car res))
               (setf ts (cdr res))
            ))
            (t (progn
               (setf res (clike-expr ts))
               (psh! out (car res))
               (setf ts (cdr res))
            ))
         )
      )
      (cons out ts)
   )
)

(defmacro clike (&rest ts)
   (let ((res-scope (clike-scope ts)))
      (if (cdr res-scope)
         (error "clike-toplevel: unexpected token `~F'~%" (caadr res-scope))
         (car res-scope)
      )
   )
)

(clike
   let i = 0;
   while <(i 10) {
      if =(mod(i 2) 0) {
         format(t "~D~%" i);
      } else {
         format(T "odd~%")
      }
      i = +(i 1);
   }
   exit();
)
