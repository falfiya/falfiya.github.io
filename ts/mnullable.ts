export {}

type nullable<t> = t & null extends never ? null : t

function assert_not_null<t>(t: nullable<t>): asserts t is nullable<t> & {} {
   if (t === null)
      throw new TypeError("value was null!")
}

declare const s1: string
assert_not_null(s1)

declare const s2: string | null
assert_not_null(s2)
s2 satisfies string

declare const u1: undefined
assert_not_null(u1)

declare const u2: undefined | null
assert_not_null(u2)
u2 satisfies never // uh oh!
