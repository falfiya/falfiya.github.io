import {Functor} from "./Functor";

export class None implements Functor<any> {
   fmap(_: any): None {
      return this;
   }
}

export class Some<A> implements Functor<any> {
   constructor (public val: A) {};
   fmap<B>(fn: (_: A) => B): Some<B> {
      return new Some(fn(this.val));
   }
}

export type Either<A> = Some<A> | None;

declare module "./Functor" {
   function fmap<A, B>(fn: (_: A) => B, $0: Either<A>): Either<B>;
}

export const none = new None;
