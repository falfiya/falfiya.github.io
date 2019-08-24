/** An object that works as a pseudo rust `match` for Option types */
export interface Match<T> {
   /**
    * Matches any `Some` values and unwraps them
    * @example
    * Some("value").match({
    *    Some(v) {
    *       // always runs
    *       assertEquals(v, "value");
    *    },
    *    None() {}
    * });
    */
   Some(v: T): any,

   /**
    * Matches `None`
    * @example
    * None.match({
    *    Some(v) {},
    *    None() {
    *       // always runs
    *       console.log("None");
    *    },
    * });
    */
   None(): any
};

/**
 * `Option` represents an optional value:
 * every `Option` is either `Some` and contains a value,
 * or is `None`, and does not.
 *
 * This is Rust's [std::option](https://doc.rust-lang.org/std/option/) ported to typescript
 */
export interface Option<T> {
   /**
    * @returns `true` if the option is a `Some` value
    */
   is_some(): boolean;

   /**
    * @returns `true` if `this` is `None`
    */
   is_none(): boolean;

   /**
    * @returns the wrapped value if `this` is a `Some`
    * @throws if the option is `None`
    */
   expect(msg: string): T;

   /** See `Option.expect` */
   unwrap(): T;

   /** Returns the contained value or a default. */
   unwrap_or(def: T): T;

   /**
    * @returns the wrapped value `this` is a `Some`
    * @returns the result of `f` if the option is a `None`
    */
   unwrap_or_else(f: () => T): T;

   /**
    * Maps an `Option<T>` to `Option<U>`
    * @returns the result of applying `f` to value wrapped in `Some`
    * @returns `None` if `this` is `None`
    */
   map<U>(f: (v: T) => U): Option<U>;

   /**
    * Map to another value or return a default `d` if `this` is `None`
    * @returns the result of applying `f` to the wrapped value
    * @returns `d` if `this` is `None`
    */
   map_or<U>(d: U, f: (v: T) => U): U;

   /**
    * Maps an `Option<T>` to `Option<U>`
    * @returns the result of applying `f` to value wrapped in `Some`
    * @returns `None` if `this` is `None`
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
    * Runs `match.Some` with the wrapped value if `this` is `Some`.
    * If this is `None`, runs `match.None`
    * @example
    * const optstring = opt.match({
    *    Some(v) {
    *       return `Some(${v})`;
    *    },
    *    None() {
    *      return "None";
    *    }
    * });
    */
   match<R>(match: Match<T>): R;
};

/** `Some(v)` */
export interface Some<T> {
   _data: T;

   /** @returns `true` */
   is_some(): boolean;

   /** @returns `false` */
   is_none(): boolean;

   /**
    * @param msg ignored
    * @returns the wrapped value
    */
   expect(msg?: string): T;

   /** @returns the wrapped value */
   unwrap(): T;

   /**
    * @param def ignored
    * @returns the wrapped value
    */
   unwrap_or(def?): T;

   /**
    * @param f ignored
    * @returns the wrapped value
    */
   unwrap_or_else(f?): T;

   /**
    * Maps an `Option<T>` to `Option<U>`
    * @returns the result of applying `f` to value wrapped in `Some`
    */
   map<U>(f: (v: T) => U): Option<U>;

   /**
    * Applies a function to the wrapped value
    * @param d ignored
    */
   map_or<U>(d: U, f: (v: T) => U): U;

   /**
    * Maps an `Option<T>` to `Option<U>`
    * Similar to `Some.map` except that `f` returns an `Option`
    * @returns the result of applying `f` to value wrapped in `Some`
    */
   and_then<U>(f: (v: T) => Option<U>): Option<U>;

   /**
    * @param opt_b ignored
    * @returns itself
    */
   or(opt_b?): Option<T>;

   /**
    * @param f ignored
    * @returns itself
    */
   or_else(f?): Option<T>;

   /**
    * Runs `match.Some` with the wrapped value
    * @example
    * const optstring = opt.match({
    *    Some(v) {
    *       // always runs
    *       return `Some(${v})`;
    *    },
    *    None() {}
    * });
    */
   match(match: Match<T>);
};

/** The inner workings of `Some` */
class SomeImpl<T> implements Option<T> {
   _data: T;

   constructor(v: T) {
      this._data = v;
   }

   is_some() { return true };

   is_none() { return false };

   expect() { return this._data };

   map<U>(f: (v: T) => U) { return new SomeImpl(f(this._data)) };

   map_or<U>(d: U, f: (v: T) => U) { return f(this._data) };

   and_then<U>(f: (v: T) => Option<U>) { return f(this._data) };

   or() { return this };

   or_else() { return this };

   match<R>(obj: { Some(v: T): R, None(): R }): R { return obj.Some(this._data) }

   unwrap = this.expect;

   unwrap_or = this.expect;

   unwrap_or_else = this.expect;
};

export function Some<T>(v: T): Some<T> {
   return new SomeImpl<T>(v);
};

export interface None {
   /** @returns `false` */
   is_some(): boolean;

   /** @returns `true` */
   is_none(): boolean;

   /** @throws "Called unwrap on None!" */
   expect(msg: string): never;

   /** @throws "Called unwrap on None!" */
   unwrap();

   /** @returns `def` */
   unwrap_or(def);

   /** @returns the result of `f` */
   unwrap_or_else(f: () => any);

   /** @returns `None` */
   map(f?): None;

   /**
    * @param f ignored
    * @returns `d`
    */
   map_or(d: any, f?): any;

   /**
    * @param f ignored
    * @returns `None`
    */
   and_then(f?): None;

   /** @returns `opt_b` */
   or(opt_b: Option<any>): Option<any>;

   /** @returns the result of `f` */
   or_else(f: () => Option<any>): Option<any>;

   /**
    * Runs `match.None`
    * @example
    * const optstring = opt.match({
    *    Some(v) {},
    *    None() {
    *       // always runs
    *       return "None";
    *    }
    * });
    */
   match<R>(match: Match<any>): R;
};

export const None: None = {
   is_none() { return true },

   is_some() { return false },

   expect(msg: string): never { throw new Error(msg) },

   unwrap() { return this.expect("Called unwrap on None!") },

   unwrap_or(v: any) { return v },

   unwrap_or_else(f: () => any) { f() },

   map(): None { return this },

   map_or(d) { return d },

   and_then(): None { return this },

   or(opt_b: Option<any>) { return opt_b },

   or_else(f: () => Option<any>) { return f() },

   match<R>(obj: { Some(v: any): R, None(): R }): R { return obj.None() },
};
