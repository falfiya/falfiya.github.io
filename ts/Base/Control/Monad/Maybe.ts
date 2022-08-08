export class None implements Functor {
   private _: undefined; // yes you need this
   fmap(_: any): None {
      return this;
   }
   toString(): string {
      return "None";
   }
}

export class Some<A> implements Functor<A> {
   constructor (private val: A) {}
   fmap<B>(fn: (_: A) => B): Some<B> {
      return new Some(fn(this.val));
   }
   toString(): string {
      return `Some(${this.val})`;
   }
}

export type Either<A> = Some<A> | None;

import {Constructor} from "../../Generic";
import {Functor} from "./Functor";
interface EitherConstructor extends Constructor {
   T: Either<this[0]>;
}

declare module "./Functor" {
   interface fmap_t extends FunctorKind<EitherConstructor> {}
}
