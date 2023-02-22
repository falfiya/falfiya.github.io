export {};

declare function expect_type<t, u extends t>(): void;

type bool<x> = x extends boolean ? false : x;

type superset<a, b> = b extends a ? true : never;

/** If some element of a is not in b */
type missing<a, b> = a extends unknown ? a extends b ? never : true : never

type and<a, b> = a extends true ? b extends true ? true : never : never;

/** b is a proper subset of a */
type proper_superset<a, b> = and<superset<a, b>, missing<a, b>>;

type A = 1 | 2 | 3 | 4;
type B = 1 | 2 | 3;

type z = proper_superset<A, B>;
