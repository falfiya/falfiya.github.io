import {$_, Constructor} from "../../Generic";

export interface Functor<A = any> {
   fmap<B>(fn: (_: A) => B): Functor<B>;
}

export interface FunctorKind<T extends Constructor<Functor>> {
   <A, B>(fn: (_: A) => B, $0: $_<T, [A]>): $_<T, [B]>;
}

export interface fmap_t {}

function fmap_f<A, B>(fn: (_: A) => B, $0: Functor<A>): Functor<B> {
   return $0.fmap(fn);
};

// [clears throat] shut the fuck up...
export const fmap: fmap_t = fmap_f as never;
