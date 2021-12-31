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
                     (setf args (cadr res-arg))
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
                     (setf ts (cadr res-element))
                  )
               )
               (car! ts) ; remove ]
            ))
            ((sym-is (car ts) "@[") (progn
               ; explosive function call
               ; + @[ '(1 2 3) ]
               (car! ts)
               (setf out `(apply ',curr ,(car! ts))) ; function name
               (token! (car! ts) "]")
            ))

            ; variable stuff
            ((sym-is (car ts) "=") (progn
               ; assignment
               (let ((res-val (clike-expr ts)))
                  (progn
                     (setf out `(setf ,curr ,(car res-val)))
                     (setf ts (cadr res-val))
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

      (list out ts) ; expr in car, excess tokens in cadr
   )
)

(defun clike-let (ts)
   (let (key res-val res-scope)
      (setf key (car! ts))
      (token! (car! ts) "=")

      (setf res-val (clike-expr ts))
      (setf ts (cadr res-val))

      (setf res-scope (clike-scope ts))
      (setf ts (cadr res-scope))

      (list `(let ((,key ,(car res-val))) ,(car res-scope)) ts)
   )
)

(defun clike-while (ts)
   (let (res-cond res-body)
      (setf res-cond (clike-expr ts))
      (setf ts (cadr res-cond))
      (token! (car! ts) "{")

      (setf res-body (clike-scope ts))
      (setf ts (cadr res-body))
      (token! (car! ts) "}")

      (list `(loop (unless ,(car res-cond) (return)) ,(car res-body)) ts)
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
               (setf ts (cadr res))
            ))
            ((sym-is (car ts) "WHILE") (progn
               (setf res (clike-while (cdr ts)))
               (psh! out (car res))
               (setf ts (cadr res))
            ))
            (t (progn
               (setf res (clike-expr ts))
               (psh! out (car res))
               (setf ts (cadr res))
            ))
         )
      )
      (list out ts)
   )
)

(defmacro clike (&rest ts)
   (let ((res-scope (clike-scope ts)))
      (if (cadr res-scope)
         (error "clike-toplevel: unexpected token `~F'~%" (caadr res-scope))
         (car res-scope)
      )
   )
)

(clike
   let i = 0;
   while <(i 10) {
      format(t "~D~%" i);
      setf(i +(i 1));
   }
   exit();
)
