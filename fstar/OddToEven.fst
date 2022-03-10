module OddToEven
open FStar.Mul

type odd = i: int{i % 2 = 1}
type even = i: int{i % 2 = 0}
let odd_to_even (x: odd): even = x * 2
