declare function is_true<_ extends true>(): void;
declare function is_false<_ extends false>(): void;

type _not_union<t1, t2> =
   t1 extends unknown
      ? t2 extends t1
         ? true
         : unknown
      : never;
type not_union<t> = _not_union<t, t>;

type z = `${undefined}`;
type not_templated_string<s extends string> =
   s extends `${infer head}${infer tail}`
      ? `${string}` extends head
         ? false
         : `${number}` extends head
            ? false
            : `${bigint}` extends head
               ? false
               : `${boolean}` extends head
                  ? false
                  : not_templated_string<tail>
      : true;

type is_prim_string<s extends string> =
   not_union<s> extends true
      ? not_templated_string<s>
      : false;

is_false<is_prim_string<"foo" | "bar">>();
is_false<is_prim_string<`${number}qux`>>();
is_false<is_prim_string<`paw${number}`>>();
is_false<is_prim_string<`baz${string}vug`>>();
is_false<is_prim_string<`${boolean}`>>();
is_true<is_prim_string<"floof">>();
is_true<is_prim_string<`${undefined}${null}`>>();
