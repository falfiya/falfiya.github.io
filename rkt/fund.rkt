#lang racket

(define true (lambda (x _) x))
(define false (lambda (_ y) y))
(define if apply)

(displayln (if true (list "Hello, World" "Goodbye World")))
