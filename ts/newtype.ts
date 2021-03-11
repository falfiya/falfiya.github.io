// the evolution of newtype in a mostly chronological order

/**
 * Basic no-leak newtype using a unique symbol to make editor auto complete
 * never show the property of the unique object.
 * See commit 78e202b9f7b918dcc2a3fd69e21e2c46716b0931.
 */
declare const _: unique symbol;
type newtype = string & {readonly [_]: unique symbol};

/**
 * Changes the name of the unique symbol to match the newtype for a better
 * hover-type experience within vscode. This works because of namespaces. we're
 * talking c-like namespaces, not c++ namespaces.
 * See commit 9b4463631c7d426b01d08b9f1093c553c5535067
 */
declare const alpha: unique symbol;
type alpha = string & {readonly [alpha]: unique symbol};

/**
 * Before steam-web-api's newtype revolution, this is how it used to be done.
 * It's impossible to unwrap the compile time contained value with this
 * declaration because "alpha" isn't part of the type.
 */
const alpha0 = "alpha0" as alpha; //:: alpha

/** This works but it's repetitive */
const alpha1 = "alpha1" as "alpha1" & alpha; //:: "alpha1" & {readonly [alpha]: unique symbol}

/**
 * Now we have a factory function to stop the repetition
 * See commit 79ee96a244bef0e25f6c99b5a9f89ca958f40cbf in ts-steam-webapi
 */
const make_alpha = <val extends string>(val: val) => val as val & alpha;
/** Functionally the same as alpha1 */
const alpha2 = make_alpha("alpha2");

/**
 * Learning to unwrap and the importance of unwrapping in the context of
 * template literal types is happening now but I'm including it in alpha.
 */
const unwrap_alpha = <val extends string>(alpha: val & alpha) =>
   alpha as val;
const alpha0_unwrapped = unwrap_alpha(alpha0); //:: string
const alpha1_unwrapped = unwrap_alpha(alpha1); //:: "alpha1"
const alpha2_unwrapped = unwrap_alpha(alpha2); //:: "alpha2"

/** What about unwrapping at the type level? */
type unwrap_alpha<A extends alpha> = A extends infer val & alpha ? val : never;
type alpha_t0 = "alpha_t0" & alpha; //:: "alpha_t0" & {readonly [alpha]: unique symbol;}
type alpha_t1 = unwrap_alpha<alpha_t0>; //:: "alpha_t0"

type alpha_t2 = unwrap_alpha<typeof alpha2>; //:: "alpha2"

/**
 * Changed the return signature of the unique key to void to make the type
 * signature smaller and to further emphasize that the unique property has no
 * use during runtime. Not semantically different than alpha so no example
 * instances.
 * See commit 32d10e1f210ff11580d9850e7b38b12ba803eb0e in ts-steam-webapi
 */
declare const beta: unique symbol;
type beta = string & {readonly [beta]: void};


/**
 * Trying out an Is-A relationship. Turns out that it's actually no different
 * than Has-A, in this instance. It just makes the generic string explicit.
 * the `= string` can be added for convenience.
 */
declare const gamma: unique symbol;
type gamma<val extends string = string> =
   & val
   & {readonly [gamma]: void};

/**
 * Both of these two are the same and are functionally equivalent to
 * `alpha0`. This suffers from the exact same issue as
 * `alpha0` since it's impossible to unwrap. Should be made quite
 * clear by the explicit and implicit <string> generic type parameter.
 */
const gamma0 = "gamma0" as gamma<string>; //:: gamma<string>
const gamma1 = "gamma1" as gamma;         //:: gamma<string>

/** Looking similar yet? This time, we've got `alpha1`. */
const gamma2 = "gamma2" as gamma<"gamma2">;

/**
 * So naturally, we'd solve it in the same way: by making a factory function.
 * This is when TypeScript's editor support starts to wheeze under the pressure.
 * make_gamma will sometimes be resolved as `any`.
 */
const make_gamma = <val extends string>(val: val) =>
   val as gamma<val>;
const gamma3 = make_gamma("gamma3"); //:: gamma<"gamma3">

/**
 * While labbing in newtype_is_a_has_a.ts, I noticed that you could separate the
 * unique object out. This is basically never useful but since I was impl-ing
 * dirent in Is-A and Has-A style and they both used the same unique symbol for
 * convenience, I also wanted to deduplicate their unique object as well. Turns
 * out that this actually leads to cleaner hover-types. This has the exact same
 * semantics as beta and therefore alpha. It's just cleaner.
 * <tangent>
 *    This documentation comment seems to also be applied to delta, the type.
 *    Looks like doc comments aren't namespaced and are tied to symbol name.
 * </tangent>
 */
declare const delta: unique symbol;
/** Separate the unique object */
type delta_t = {readonly [delta]: void};
type delta = string & delta_t;

/** Can we make the unwrap template generic for all has-a newtypes? */
type unwrap_has_a<child extends base, base> = child extends infer val & base ? val : never;

type delta_t0 = string & delta; //:: string & delta_t

// These two are equivalent
type delta_t1 = unwrap_has_a<delta, delta>;       //:: unknown
type delta_t2 = unwrap_has_a<delta_t0, delta>; //:: unknown

// These two are also equivalent
type delta_t3 = unwrap_has_a<delta, delta_t>;       //:: string
type delta_t4 = unwrap_has_a<delta_t0, delta_t>; //:: string

type delta_t5 = "delta_t5" & delta;
type delta_t6 = unwrap_has_a<delta_t5, delta>; //:: "delta_t5"

/**
 * So the logical next step would be to combine gamma and delta.
 * epsilon has the same semantics as gamma and therefore will not have examples.
 * Delta is better than epsilon becauese of the lack of higher kinded types.
 */
declare const epsilon: unique symbol;
type epsilon_t = {readonly [delta]: void};
type epsilon<val extends string = string> = val & delta_t;

/** Borrow gamma's factory function */
const make_epsilon = <val extends string>(val: val) =>
   val as epsilon<val>;

const epsilon0 = make_epsilon("epsilon0"); //:: epsilon<"epsilon0">
type epsilon_t0 = typeof epsilon0; //:: "epsilon0" & delta_t

/** Let's make an unwrap template for epsilon too! */
type unwrap_epsilon<E extends epsilon> =
   E extends epsilon<infer val> ? val : never;

type epsilon_t2 = epsilon<"epsilon_t2">;
type epsilon_t3 = unwrap_epsilon<epsilon_t2>; //:: "epsilon_t2"

/**
 * Can we make it generic to any is-a newtype?
 * n o .
 * No higher kinded types :death: :disapproval: :scringe:
 */
// type unwrap_is_a<child, base> = child extends base<infer val> ? val : never;
