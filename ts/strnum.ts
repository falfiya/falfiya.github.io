type digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type char = digits[number];
type char_except_0 = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type char_except_9 = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

type pred<i extends char_except_0> = [never, ...digits][i];

type add_char<acc, i> =
   i extends char_except_0
      ? acc extends char_except_9
         ? add_char<["1", "2", "3", "4", "5", "6", "7", "8", "9"][acc], pred<i>>
         : [result: add_char<"0", pred<i>>[0], carry: true]
      : [result: acc, carry: false];

type or<a, b> = a | b extends false ? false : true;

// bootstrapper
// acc + i = ??
type add<acc extends string, i extends string> = add$0<i, acc, false>;

type add$0<i extends string, acc extends string, carry> =
   i extends `${infer i_first}${char}`
      ? i extends `${i_first}${infer i_last}`
         // If there's a carry from the previous (aka lesser) digit, add one to
         // our current digit. When our current digit is "9", we overflow to
         // zero and the carry flag is set.    vvvvv
         ? add$1<i_first, carry extends true ? add_char<i_last, "1"> : [i_last, false], acc>
         : never
      // Empty string for the i side but there's a carry so instead of being
      // done, we have to add one more.
      : carry extends true
         ? add$1<"", ["1", false], acc>
         : acc // <-- exit

// acc:    2
//   i: + 40
//
// We see that the acc side is short on digits when we get to the 10s column.
// add$1 generates "0" digits for the acc side when needed so that add_char works correctly.
type add$1<i_first extends string, i_last extends [any, any], acc extends string> =
   acc extends `${infer acc_first}${char}` ? acc extends `${acc_first}${infer acc_last}`
      ? add$2<i_first, i_last, acc_first, acc_last> : never
      : add$2<i_first, i_last, "", "0">

// add$2 is entirely a passthrough lambda so that we have an alias for add_res
type add$2<i_first extends string, i_last extends [any, any], acc_first extends string, acc_last> =
   add$3<i_first, i_last, acc_first, add_char<acc_last, i_last[0]>>;

// Figure out if there was any carrying done along the way, recurse, and concatenate strings.
type add$3<i_first extends string, i_last extends [any, any], acc_first extends string, add_res extends [any, any]> =
   `${add$0<acc_first, i_first, or<i_last[1], add_res[1]>>}${add_res[0]}`;


export type _420 = add<"378", "42">;
