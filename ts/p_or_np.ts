// Property or No Property
export {};
type assert_subtype<supertype, subtype extends supertype> = void;

// Let's model a type who either has a field "id" of type number or doesn't have
// the field at all.

// First Try "Naive" -----------------------------------------------------------
type naive = {id?: number};
void 0 as assert_subtype<number, naive["id"]>;
// We see above that getting id could be undefined, which is correct.
// What if we try refining / narrow the type by asserting that the key "id" does
// in fact exist?
declare const naive: naive;
if ("id" in naive) {
   void 0 as assert_subtype<number, typeof naive["id"]>;
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
type hopium = {id: number} | {};
declare const hopium: hopium;

function hop<k extends string>(o: {}, k: k): o is {[key in k]: unknown} {
   return Object.prototype.hasOwnProperty.call(o, k);
}
if (hop(hopium, "id")) {
   void 0 as assert_subtype<number, typeof hopium.id>;
}

// Alright so why isn't this working?
// Let's take look at type predicates.
declare const Cat: unique symbol;
declare const Dog: unique symbol;
type Cat = typeof Cat;
type Dog = typeof Dog;
type Cag = Cat | Dog;
declare function is_cat(c: Cag): c is Cat;
declare const cag: Cag;
if (is_cat(cag)) {
   void 0 as assert_subtype<Cat, typeof cag>;
   void 0 as assert_subtype<Dog, typeof cag>;
}

// and so the way this narrowing works is simple:
void 0 as assert_subtype<Cat, Cag & Cat>;
// expanding it:
void 0 as assert_subtype<Cat, (Cat | Dog) & Cat>;
// Why does the in operator work and hop doesn't?
// Well, the way the in operator works with narrowing types seems to be special.

// Consider this:
void 0 as assert_subtype<union, {id: string}>;
// Yeah, that's right. {id: string} is a subtype of {} and therefore of union.
// Wait so then in doesn't work correctly?

declare function kill_all_humans(): void;
function succ(n: number): number {
   const next = n + 1;
   if (typeof next === "number") {
      return next;
   } else {
      kill_all_humans();
      return next;
   }
}
function print_next_id(u: union) {
   if ("id" in u) {
      console.log(succ(u.id));      
   }
}
print_next_id({id: "yeah this is fine"});
// I think you can see where this is going.

// Fourth Try "Four" -----------------------------------------------------------
// So in the first place, the type definition union is incorrect. It allows id
// to have non-number types.
// https://stackoverflow.com/questions/58594051
type four = {id: number} | ({[key in string]: null} & {id?: never});
const four: four = {id: 1};

if (hop(four, "id")) {
   void 0 as assert_subtype<number, typeof four.id>;
}

// Conclusion ------------------------------------------------------------------
type not_key<k extends string> = {[key in string]: null} & {[key in k]?: never};

type p_or_np = {id: number} | not_key<"id">;
declare const p_or_np: p_or_np;
if (hop(p_or_np, "id")) {
   p_or_np.id;
} else {
   p_or_np.id; // why is it undefined
}
