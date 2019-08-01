/**
 * [[Option]] represents an optional value:
 * every [[Option]] is either [[Some]] and contains a value,
 * or [[None]], and does not.
 * 
 * This is Rust's [std::option](https://doc.rust-lang.org/std/option/) ported to typescript
 */
export interface Option<T> {
   /**
    * @returns `true` if the option is a [[Some]] value
    */
   is_some(): boolean;

   /**
    * @returns `true` if the option is a [[None]].
    */
   is_none(): boolean;

   /**
    * @returns the wrapped value if the option is a [[Some]].
    * @throws if the option is [[None]].
    */
   expect(msg: string): T;

   /**
    * See [[Option.expect]].
    */
   unwrap(): T;

   /**
    * Returns the contained value or a default.
    */
   unwrap_or(def: T): T;

   /** @returns the wrapped value or computes it from a function */
   unwrap_or_else(f: () => T): T;

   /**
    * Maps an `Option<T>` to `Option<U>`
    * ```typescript
    * echo(1)
    * ```
    * @returns the result of applying `f` to value wrapped in `Some`
    * @returns `None` if the option is `None`
    */
   map<U>(f: (v: T) => U): Option<U>;

   /**
    * Applies a function to the wrapped value (if any), or returns the provided default (if not).
    * @param d if `this` option is `None`
    */
   map_or<U>(d: U, f: (v: T) => U): U;

   /**
    * This function is like `map` except for that the function returns an Option
    */
   and_then<U>(f: (v: T) => Option<U>): Option<U>;

   /**
    * @returns `this` if `this` is `Some`
    * @returns `opt_b` if `this` is `None`
    */
   or(opt_b: Option<T>): Option<T>;

   /**
    * @returns `this` if `this` is `Some`
    * @returns the result of `f` if `this` is `None`
    */
   or_else(f: () => Option<T>): Option<T>;

   /**
    * An attempt at Rust matching syntax in JavaScript
    * @example
    * opt.match {
    *    Some(v) {
    *       console.log(`Got a ${v}!`);
    *    },
    *    None() {
    *       console.log("Got nothing");
    *    },
    * }
    */
   match_void(obj: { Some(v: T): void, None(): void }): void;
   
   match_fn(obj: { Some(v: T): Option<T>, None(): Option<T> }): Option<T>;
}
/** Some value `T` */
class Some<T> implements Option<T> {
   private _data: T;

   constructor(v: T) {
      this._data = v;
   }

   is_some() { return true };

   is_none() { return false };

   expect() { return this._data };

   map<U>(f: (v: T) => U) { return new Some(f(this._data)) };

   map_or<U>(d: U, f: (v: T) => U) { return f(this._data) };

   and_then<U>(f: (v: T) => Option<U>) { return f(this._data) };

   or() { return this };

   or_else() { return this };

   match(obj: { Some(v: T): void, None(): void }) { obj.Some(this._data) }

   unwrap = this.expect;

   unwrap_or = this.expect;

   unwrap_or_else = this.expect;
}

/** No value */
class None implements Option<any> {
   is_none() { return true };
   
   is_some() { return false };

   expect(msg: string): never { throw new Error(msg) };

   unwrap() { return this.expect("Called unwrap on None!") };

   unwrap_or(v: any) { return v };

   unwrap_or_else = (f: () => any) => f();

   map(): None { return this };

   map_or<U>(d: U) { return d };

   and_then(): None { return this };

   or(opt_b: Option<any>) { return opt_b };

   or_else(f: () => Option<any>) { return f() };

   match(obj: { Some(v: any): void, None(): void }) { obj.None() };
}

function Summ<T>(v: T) { return new Some(v) }

const Nunn = new None;

export function nn(v: any) {
   return v == null ? Nunn : Summ(v);
}

export {
   Summ as Some,
   Nunn as None,
};
