import {newtype} from "./newtype5";

export type uint = number & newtype<"uint">
export type even = number & newtype<"even">;

type force_even<n extends number> =
   `${number}` extends `${n}`
      ? even
      : `${n}` extends `${string}.${string}`
         ? even
         : `${n}` extends `${number}${0 | 2 | 4 | 6 | 8}`
            ? unknown
            : even;

export function even<n extends number>(n: n & force_even<n>): n & even {
   return n as never;
}

export function div(a: even, b: even): uint {
   return (a / b) as never;
}

// @ts-expect-error
even(1);
// @ts-expect-error
even(3);
