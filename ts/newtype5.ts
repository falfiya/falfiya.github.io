// simpler newtype and corrected to allow for unions and type narrowing
export {};

declare const phi: unique symbol;

type union_to_intersection<u> =
   (u extends any ? {(k: u): void} : never) extends {(k: infer t): void} ? t : never;
type newtype_partials_union<phi_uniq_union extends keyof any> =
   {[k in phi_uniq_union]: {[phi]: {[_ in k]: void}}}[phi_uniq_union];

type newtype<uniq extends string | symbol> = {[phi]: {[k in uniq]: void}};
type unwrap<outer> =
   outer extends {[phi]: {}}
      ? outer extends infer inner & union_to_intersection<newtype_partials_union<keyof outer[typeof phi]>>
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
declare function take_u32(u: u32): `seconds: ${unwrap<u32>}`;

declare const my_int: i32;
if (is_unsigned(my_int)) {
   take_u32(my_int);
} else {
   take_u32(my_int);
}

type num = unwrap<u32>; //:: number
