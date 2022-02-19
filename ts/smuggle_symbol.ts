module sym_a {
   declare const a: unique symbol;
   export type us = typeof a;
   export type type = {[a]: void};
}
module sym_b {
   declare const b: unique symbol;
   export type us = typeof b;
   export type type = {[b]: void};
}

declare const smuggled_a: sym_a.us;
type newtype_a = {[smuggled_a]: void};
declare const smuggled_b: sym_b.us;
type newtype_b = {[smuggled_b]: void};

export type a_isomorphic = newtype_a extends sym_a.type ? true : false;
export type b_isomorphic = newtype_b extends sym_b.type ? true : false;

export type newtype<us extends symbol, of> = of & {[k in us]: void};
