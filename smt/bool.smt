(declare-datatypes (($bool 0)) (((T) (F))))

(declare-fun not ($bool) $bool)
(assert (= (not F) T))
(assert (= (not T) F))

(declare-fun and ($bool $bool) $bool)
(assert (= (and F F) F))
(assert (= (and F T) F))
(assert (= (and T F) F))
(assert (= (and T T) T))

(declare-fun or ($bool $bool) $bool)
(assert (= (or F F) F))
(assert (= (or F T) T))
(assert (= (or T F) T))
(assert (= (or T T) T))

(declare-fun x () $bool)
(declare-fun y () $bool)

(assert (forall ((x $bool) (y $bool)) (=
   (not (and (not x) (not y)))
   (or x y))))

; law of excluded middle
(assert (forall ((b $bool)) (= T (or b (not b)))))

(check-sat)
