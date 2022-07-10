import {Functor} from "./Functor";

export class List<A> implements Functor<A> {
   constructor (private ary: A[]) {}
   fmap<B>(fn: (_: A) => B): List<B> {
      return new List(this.ary.map(fn));
   }
   toString(): string {
      return `List(${this.ary.join(", ")})`;
   }
}

import {Constructor} from "../../Generic";
interface ArrayConstructor extends Constructor {
   T: List<this[0]>;
}

declare module "./Functor" {
   interface fmap_t extends FunctorKind<ArrayConstructor> {}
}
