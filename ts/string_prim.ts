declare function is_true<_ extends true>(): void;
declare function is_false<_ extends false>(): void;

type _not_union<t1, t2> =
   t1 extends unknown
      ? t2 extends t1
         ? true
         : unknown
      : never;
/** Returns `true` if t is not a union, `unknown` otherwise */
type not_union<t> = _not_union<t, t>;

/** Returns `true` on regular string and `false` on templated string */
type not_templated_string<s extends string> =
   s extends ""
      ? true
      : s extends `${infer head}${infer tail}`
         ? string extends head
            ? false
            : `${string}` extends head
               ? false
               : `${number}` extends head
                  ? false
                  : `${bigint}` extends head
                     ? false
                     : `${boolean}` extends head
                        ? false
                        : not_templated_string<tail>
         : false;

/** Returns `true | false` */
type is_prim_string<s extends string> =
   not_union<s> extends true
      ? not_templated_string<s>
      : false;

// gotta love typescript
is_false<is_prim_string<"foo" | "bar">>();
is_false<is_prim_string<`${number}qux`>>();
is_false<is_prim_string<`paw${number}`>>();
is_false<is_prim_string<`baz${string}vug`>>();
is_false<is_prim_string<`${boolean}`>>();
is_false<is_prim_string<`${string}`>>();
is_false<is_prim_string<string>>();
is_false<is_prim_string<`${string}aaaa${string}`>>();
is_false<is_prim_string<`aaaasdasd${1 | 2}asdasd`>>();
is_true<is_prim_string<"floof">>();
is_true<is_prim_string<`${undefined}${null}`>>();
is_true<is_prim_string<"">>();
