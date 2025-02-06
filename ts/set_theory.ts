declare const error: unique symbol;

type Error<msg="Error"> = {[error]: msg};
type Impossible = Error<"Impossible">;

/**
 * Empty set plus `T`
 */
type Add<T=any> = (has: T, _: void) => T;
/**
 * Universal set minus `T`
 */
type Sub<T=any> = (_: void, not: T) => T;
type Set =
   | Add<unknown>
   | Sub<unknown>;

type Elem<needle, haystack extends Set> =
   haystack extends Add<infer addHaystack>
   ? needle extends addHaystack
      ? true
      : false
   : haystack extends Sub<infer subHaystack>
      ? needle extends subHaystack
         ? false
         : true
      : Impossible;

/**
 * A - B
 */
type SubtractAddAdd<A extends Add, B extends Add> =
   [A, B] extends [Add<infer a>, Add<infer b>]
   ? Add<a extends b ? never : a>
   : Impossible;

/**
 * By definition
 */
type UnionAdd<A extends Add, B extends Add> =
   [A, B] extends [Add<infer a>, Add<infer b>]
   ? Add<a | b>
   : Impossible;

/**
 * By definition
 */
type IntersectionAdd<A extends Add, B extends Add> =
[A, B] extends [Add<infer a>, Add<infer b>]
? Add<a & b>
: Impossible;

/**
 * De Morgan's law
 *
 * ~A = U\A
 * ~B = U\B
 *
 * ~A | ~B = ~(A & B)
 */
type UnionSub<A extends Sub, B extends Sub> =
   [A, B] extends [Sub<infer a>, Sub<infer b>]
   ? Sub<a & b>
   : Impossible;

/**
 * De Morgan's law
 *
 * ~A = U\A
 * ~B = U\B
 *
 * ~A & ~B = ~(A | B)
 */
type IntersectionSub<A extends Sub, B extends Sub> =
[A, B] extends [Sub<infer a>, Sub<infer b>]
? Sub<a | b>
: Impossible;

type Subtract<A extends Set, B extends Set> = 1;

// type IsSubset<Child extends Set, Parent extends Set> =

// type Power<A extends Set> =
