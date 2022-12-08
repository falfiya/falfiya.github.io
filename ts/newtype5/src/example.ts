import {newtype, unwrap} from "./newtype5";

type unsigned = (number | bigint) & newtype<"unsigned">;
function is_unsigned(n: number | bigint): n is unsigned {
   return n >= 0;
}

type i32 = number & newtype<"i32">;
function to_i32(x: unknown): i32 {
   return (x as number | 0) as i32;
}

type u32 = i32 & unsigned;

export function seconds_string(u: u32): `seconds: ${unwrap<u32>}` {
   return `seconds: ${u}`;
}

declare const my_int: i32;
if (is_unsigned(my_int)) {
   seconds_string(my_int);
} else {
   // error
   //seconds_string(my_int);
}

type num = unwrap<u32>; //:: number

// we want this to look like succ(a: number): number
export function succ(a: u32): u32 {
   const b = to_i32(a);
   if (is_unsigned(b)) {
      return (b + 1) as never;
   } else {
      throw new Error("must be positive");
   }
}
