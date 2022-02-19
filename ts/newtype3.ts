declare const sym_s: unique symbol; // symbol symbol
declare const of_s: unique symbol;

export type unwrap<it> = it extends {[of_s]: infer val} ? val : it;

export type newtype<s extends symbol, of> =
   of & {[sym_s]: {[k in s]: void}; [of_s]: unwrap<of>};

export function unwrap<it>(it: it): unwrap<it> {
   return it as any;
}

const u = unwrap;

module i32 {
   declare const i32_s: unique symbol;

   export type i32<val extends number = number> =
      newtype<typeof i32_s, val>;

   export function from<val extends number>(val: val): i32<val> {
      return ~~val as any;
   }

   export function take_i32(_: i32) {}
}

const five = i32.from(5); //:: i32.i32<5>
i32.take_i32(five);
const five_cats = `${u(five)} cats!` as const; //:: "5 cats!"
(void five_cats)

module seconds {
   declare const seconds_s: unique symbol;

   export type seconds<val extends i32.i32 = i32.i32> =
      newtype<typeof seconds_s, val>;

   export function from<val extends i32.i32>(val: val): seconds<val> {
      return val as any;
   }

   export function take_seconds(_: seconds) {}
}

const five_seconds = seconds.from(five); //:: seconds.seconds<i32.i32<5>>
i32.take_i32(five_seconds);
seconds.take_seconds(five_seconds);
const till_tomorrow =
   `${u(five_seconds)} seconds till tomorrow.` as const;
   //:: "5 seconds till tomorrow."

(void till_tomorrow)
//seconds.take_seconds(five);
// Argument of type 'i32<5>' is not assignable to
// parameter of type 'seconds<i32<number>>'.
