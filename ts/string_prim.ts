declare function is_true<t extends true>(): void;
declare function is_false<t extends false>(): void;

type is<t1, t2> = t1 extends unknown ? t2 extends t1 ? true : unknown : never;
type is_solo<t> = is<t, t>;

type q = is_solo<`${1 | 2
}a`>;

type qqq = keyof {[k in `baz${string}vug`]: void};

type z = Capitalize<`${string}baz${string}vug`>;

type is_prim_string<s extends string> = true;

namespace many {
   is_false<is_prim_string<"foo" | "bar">>();
   is_false<is_prim_string<`${number}qux`>>();
   is_false<is_prim_string<`paw${number}`>>();
   is_false<is_prim_string<`baz${string}vug`>>();
}

type prim = "floof";

assert_extends<true, is_prim_string<prim>>();
assert_extends
