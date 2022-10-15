// Property or No Property

type assert_subtype<supertype, subtype extends supertype> = void;

// Let's model a type who either has a field "id" of type number or doesn't have
// the field at all.

// First Try "Naive" -----------------------------------------------------------
type naive = {id?: number};
(void 0 as assert_subtype<number, naive["id"]>);
// We see above that getting id could be undefined, which is correct.
// What if we try refining / narrow the type by asserting that the key "id" does
// in fact exist?
declare const naive: naive;
if ("id" in naive) {
   (void 0 as assert_subtype<number, typeof naive["id"]>);
}
// So we've actually not even narrowed the type at all.
// The way ?: works is that it makes the field accessible and unions the field
// type with undefined to make it correct.

// We want typescript to prevent us from accessing "id" until we've proven it
// exists.

// Second Try "Union" ----------------------------------------------------------
type union = {id: number} | {};
type this_is_good = union["id"]; // "id" is not in {}
declare const union: union;
if ("id" in union) {
   void 0 as assert_subtype<number, typeof union.id>;
}
// This is pretty good, but we're using the cursed in operator.
// I could just as easily say this:
if ("toString" in union) {
   // not really what I was looking for
}
// And while that's technically correct, I'm thinking of Object.hasOwnProperty.

// Third Try "Hopium" ----------------------------------------------------------
// Let's make a function that narrows a value based on the result of Object.HOP
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html
// See the "#using-type-predicates" section.
function hop<k extends string>(o: {}, k: k): o is {[key in k]: unknown} {
   return Object.prototype.hasOwnProperty.call(o, k);
}
if (hop(union, "id")) {
   union
}
