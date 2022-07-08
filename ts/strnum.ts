type digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type char = digits[number];
type char_except_0 = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type char_except_9 = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

type head<s> = s extends `${infer head}${char}` ? head : "";
type tail_or<s, or> =
   s extends `${infer head}${char}`
      ? s extends `${head}${infer tail}` ? tail : never
      : or;
type pred<i extends char_except_0> = [never, ...digits][i];

type add_char<acc, i> =
   i extends char_except_0
      ? acc extends char_except_9
         ? add_char<["1", "2", "3", "4", "5", "6", "7", "8", "9"][acc], pred<i>>
         : [add_char<"0", pred<i>>[0], true]
      : [acc, false];

type do_carry<carry, x> = carry extends true ? add_char<x, "1"> : [x, false];
type or<a, b> = a | b extends false ? false : true;

type add<acc extends string, i extends string, carry = false> =
   i extends `${infer i_first}${char}`
      ? i extends `${i_first}${infer i_last}`
         ? `${add<head<acc>, i_first, or<do_carry<carry, i_last>[1], add_char<tail_or<acc, "0">, do_carry<carry, i_last>[0]>[1]>>}${add_char<tail_or<acc, "0">, do_carry<carry, i_last>[0]>[0]}`
         : never
      : carry extends true
         ? add<acc, "0", true>
         : acc;

export type lol = add<"378", "42">; //: "420"
