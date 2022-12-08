export {};

type subtype<l, r> = l extends r ? true : false;

declare function subtype<l extends r, r>(): void;

type consume = {(u: unknown): void}
type asserts<t> = {(u: unknown): asserts u is t};

// okay, this is fine
subtype<asserts<number>, consume>();

// uh, typescript? surely the number of assertion functions is smaller than
// the number of void functions
subtype<consume, asserts<number>>();

// oh no
subtype<asserts<number>, asserts<string>>();

// So this is, in formal type theory terms, "pretty fucking bad".
// Internally, typescript sees the return type of asserts<*> as void.

// but wait...
subtype<number, asserts<number> extends asserts<infer t> ? t : never>();

// Using conditional types, we seem to be able to access the true type predicate
// type.
// Maybe we can use this.

export type is_assert_fn<f> =
   f extends asserts<infer t>
      ? unknown extends t
         ? false
         : true
      : false;
