#set text(
   font: "Lora",
   size: 12pt,
)

#let c(x) = align(center, x)

#show heading: it => {
   let font
   if it.level == 1 {
      font = "Zen Antique"
   } else {
      font = "Lora"
   }
   set text(size: 25pt / calc.pow(it.level, 0.4), font: font, weight: "bold")

   if it.level == 2 {
      [
         #c(it)
         #line(length: 100%)
      ]
   } else {
      [#it]
   }
}

#c([
   = *Garbage Collection*
   Last Update: #datetime.today().display()
])

#set list(
   marker: ([•], [‣], [◦]),
)

#set table(
   stroke: (x, y) => if x == 0 and y == 0 {
      (bottom: 0.7pt + black, right: 0.7pt + black)
   } else if x == 0 {
      (right: 0.7pt + black)
   } else if y == 0 {
      (bottom: 0.7pt + black)
   },
   align: (x, y) => left
)

#let st = $in.rev:$

A program's objects ($V$) and references ($E$) are represented by a directed graph $P=(V,E)$. Each program has at least $phi in V$.

#c(
   table(columns: (1fr, 1fr),
      [Math], [English],
      [$ frac(a in V, P tack a) $],
      [If $a$ is a node in $V$, then we can say it's "in" $P$.],
      [$ frac("", P tack phi) $],
      [The node $phi$ always exists in $P$.],
      [$ frac((a, b) in E, P tack a -> b) $],
      [If there is a directed edge from $a$ to $b$, we write $a -> b$.],
      [$ frac(P tack (a -> b) and (b -> c), P tack a ~~> c) $],
      [Intr' of a new notation $~~>$.],
      [$ frac(P tack a, P tack a ~~> a) $], [Reflexivity of $~~>$ shown.],
      [$ frac(P tack (a ~~> b) and (b ~~> c), a ~~> c) $],
      [Transitivity of $~~>$ shown.],
      [$
         therefore P tack a ~~> b "iff" exists x_1...x_n in V st \
         (a = x_1) and (b = x_n) and (x_1 -> ... -> x_n)
      $],
      [Therefore, the meaning of $a ~~> b$ is "there exists some path from a to b".],
      [$ frac(P tack phi ~~> a, P tack R(a)) $],
      [Intr' of a new predicate $R(x in V)$. If $R(a)$ holds, we say that $a$ is referenced by the program.],
      [$ frac(P tack b, P tack b^n "where" n = |{a | a -> b and R(a)}|) $],
      [Intr' of a new notation $a^n$.\ It can be thought of as the number of "meaningful references to $a$."],
      [$ frac(P tack R(a), P tack a^n "where" n > 0) $],
      [If $R(a)$ holds, what does that say about $a^n$?],
      [$ frac(P tack a^0, P tack cancel(R(a))) $],
      [If $a$ has no "meaningful references", does $R(a)$ hold?],
      [$ frac(P tack ([a -> b] ->> [a cancel(->) b])\, R(a), P tack b^n ->> b^(n-1)) $],
      [Intr' of new notation $->>$. When $a ->> b$, we say "$a$ steps to $b$".]
   )
)
