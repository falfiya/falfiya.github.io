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
const alpha_instance0 = "alpha" as alpha; //:: alpha

/** This works but it's repetitive */
const alpha_instance1 = "alpha" as "alpha" & alpha;

/**
 * Now we have a factory function to stop the repetition
 * See commit 79ee96a244bef0e25f6c99b5a9f89ca958f40cbf in ts-steam-webapi
 */
const make_alpha = <val extends string>(val: val) => val as val & alpha;
/** Functionally the same as alpha_instance1 */
const alpha_instance2 = make_alpha("alpha");

/**
 * Learning to unwrap and the importance of unwrapping in the context of
 * template literal types happened a bit later but I'm including it in alpha
 * anyways.
 */
const unwrap_alpha = <val extends string>(alpha: val & alpha) =>
   alpha as val;
const alpha_instance0_unwrapped = unwrap_alpha(alpha_instance0); //:: string
const alpha_instance1_unwrapped = unwrap_alpha(alpha_instance1); //:: "alpha"
const alpha_instance2_unwrapped = unwrap_alpha(alpha_instance2); //:: "alpha"

/** What about unwrapping at the type level? */
type unwrap_alpha<A extends alpha> = A extends infer val & alpha ? val : never;
type alpha_type0 = "alpha" & alpha; //:: "alpha" & {readonly [alpha]: unique symbol;}
type alpha_type1 = unwrap_alpha<alpha_type0>; //:: "alpha"

/** Can we make the unwrap template generic for all types? */
type unwrap2<child extends base, base> = child extends infer val & base ? val : never;
type alpha_type2 = unwrap2<alpha_type0, alpha>; //:: "alpha"

/** what about without the second type parameter? */
type unwrap1<child> = child extends infer T & infer U ? T : never;



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
 * `alpha_instance0`. This suffers from the exact same issue as
 * `alpha_instance0` since it's impossible to unwrap. Should be made quite
 * clear by the explicit and implicit <string> generic type parameter.
 */
const gamma_instance0 = "gamma.alpha" as gamma<string>; //:: gamma<string>
const gamma_instance1 = "gamma.alpha" as gamma;         //:: gamma<string>

/** Looking similar yet? This time, we've got `alpha_instance1`. */
const gamma_instance2 = "gamma.alpha" as gamma<"gamma.alpha">;

/**
 * So naturally, we'd solve it in the same way: by making a factory function.
 * This is when TypeScript's editor support starts to wheeze under the pressure.
 * make_gamma will sometimes be resolved as `any`.
 */
const make_gamma = <val extends string>(val: val) =>
   val as gamma<val>;
const gamma_instance3 = make_gamma("gamma.alpha");


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

/**
 * So the logical next step would be to combine gamma and delta.
 * epsilon has the same semantics as gamma and therefore will not have examples.
 * Neither delta nor epsilon is strictly better than the other, it's just a
 * matter of preference at this point.
 */
declare const epsilon: unique symbol;
type epsilon_t = {readonly [delta]: void};
type epsilon<val extends string = string> = val & delta_t;


