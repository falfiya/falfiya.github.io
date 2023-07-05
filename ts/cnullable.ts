export {}

declare const error_us: unique symbol
type error_message<msg extends string> = {[error_us]: msg}

type force_nullable_t<t> =
   null extends t
      ? t // all good
      : error_message<"type must include null">

function assert_not_null<t>(t: force_nullable_t<t>): asserts t is Exclude<typeof t, null> {
   if (t === null)
      throw new TypeError("Value was null!")
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
u2 satisfies never // that's good, it doesn't work anymore
