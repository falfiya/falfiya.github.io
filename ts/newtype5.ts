// simpler newtype and corrected to allow for unions and type narrowing
export {};

declare const phi: unique symbol;

type newtype<uniq extends string | symbol> = {[phi]: {[k in uniq]: void}};
type unwrap<outer> =
   outer extends {[phi]: {}}
      ? outer extends infer inner & {[phi]: {[k in keyof outer[typeof phi]]: void}}
         ? inner
         : never
      : outer;
function unwrap<outer>(outer: outer): unwrap<outer> {
   return outer as never;
}

type unsigned = (number | bigint) & newtype<"unsigned">;
function is_unsigned(n: number | bigint): n is unsigned {
   return n >= 0;
}
type i32 = number & newtype<"i32">;
type u32 = i32 & unsigned;
declare function take_u32(u: u32): void;

declare const my_int: i32;
if (is_unsigned(my_int)) {
   take_u32(my_int);
} else {
   take_u32(my_int);
}
