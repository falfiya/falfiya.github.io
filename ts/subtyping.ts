// <: "can be used in place of"
// :> "contains"

// expected covariant
type top_t = unknown;
type middle_t = {};
type bottom_t = never;
declare const top_t: top_t;
declare const middle_t: middle_t;
declare const bottom_t: bottom_t;

// bottom <: middle <: top
middle_t satisfies top_t;
bottom_t satisfies top_t;
bottom_t satisfies middle_t;
// top </: middle
top_t satisfies middle_t;

// expected contravariant
// afn = argument in function
type top_afn = {(_: top_t): void}
type middle_afn = {(_: middle_t): void};
type bottom_afn = {(_: bottom_t): void}
declare const top_afn: top_afn;
declare const middle_afn: middle_afn;
declare const bottom_afn: bottom_afn;

// top_afn <: middle_afn <: bottom_afn
top_afn satisfies bottom_afn;
middle_afn satisfies bottom_afn;
top_afn satisfies middle_afn;
// bottom_afn </: middle_afn
bottom_afn satisfies middle_afn;

// demonstrated using function overloading
{
   // top_afn <: bottom_afn
   function f(_: bottom_t): void;
   // top_afn <: middle_afn
   function f(_: middle_t): void;
   function f(_: top_t): void {}
   // bottom_afn </: middle_afn
   function g(_: middle_t): void;
   function g(_: bottom_t): void {};
}

// return types are covariant as usual
// rfn = return in function
type top_rfn = {(): top_t};
type middle_rfn = {(): middle_t};
type bottom_rfn = {(): bottom_t};
declare const top_rfn: top_rfn;
declare const middle_rfn: middle_rfn;
declare const bottom_rfn: bottom_rfn;

// bottom_rfn <: middle_rfn <: top_rfn
middle_rfn satisfies top_rfn;
bottom_rfn satisfies top_rfn;
bottom_rfn satisfies middle_rfn;

declare const n: never;

// what about function overloading?
{

   // bottom_rfn <: top_rfn
   function f(): bottom_t;
   // middle_rfn <: top_rfn
   function f(): middle_t;
   function f(): top_t { return n }
   // great, business as usual

   // top_rfn <: bottom_rfn ????
   function g(): top_t;
   // middle_rfn <: bottom_rfn ????
   function g(): middle_t;
   function g(): bottom_t { return n }
}

// so return types on function overloading seem to be bivariant
// let's make a middle2_t such that
// 1) middle_t </: middle2_t
// 2) middle_2 </: middle2_t
// (this is known as a sibling to middle_t)
// we can see that middle2_t obeys the same properties here as middle_t

type middle2_t = null;
type middle2_rfn = {(): middle2_t};
declare const middle2_rfn: middle2_rfn;

// middle2_rfn <: top_rfn;
middle2_rfn satisfies top_rfn;
// middle2_rfn </: bottom_rfn;
middle2_rfn satisfies bottom_rfn;

{
   // (covariance) bottom_rfn <: middle_rfn
   function f(): bottom_t;
   // (contravariance) top_rfn <: middle_rfn
   function f(): top_t;
   // middle2_rfn </: middle_rfn
   function f(): middle2_t;
   function f(): middle_t { return n }

   // middle_rfn </: middle2_rfn
   function g(): middle_t;
   function g(): middle2_t { return n }
}

// therefore we can conclude that function overload return types are bivariant
