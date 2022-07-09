export interface None {
   fmap(_: any): None;
}

export const None = {
   fmap(_: any): None {
      return this;
   }
}

export class Some<A> {
   constructor (public val: A) {};
   fmap<B>(fn: (_: A) => B): Some<B> {
      return new Some(fn(this.val));
   }
}

export type Either<A> = Some<A> | None;

import {Constructor} from "../../Kind";
interface EitherConstructor extends Constructor {
   T: Either<this[0]>;
}

declare module "./Functor" {
   interface fmap_t extends FunctorKind<EitherConstructor> {}
}
