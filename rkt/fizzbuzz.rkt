#lang racket

(define fizzbuzz
   ((lambda (fn) (lambda (init) (fn fn init)))
      (lambda (self arg)
         (let* ([n (car arg)] [m (cdr arg)])
            (if (not (= n m))
               (begin
                  (displayln
                     (if (zero? (modulo n 15))
                        "fizzbuzz"
                        (if (zero? (modulo n 3))
                           "fizz"
                           (if (zero? (modulo n 5))
                              "buzz"
                              n))))
                  (self self (cons (+ 1 n) m))
               )
               (displayln "Done.")
            )
         )
      )
   )
)
(fizzbuzz '(1 . 100))
