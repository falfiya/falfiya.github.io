export interface Functor<A> {
   fmap<B>(fn: (_: A) => B): Functor<B>;
}

export declare function fmap<A, B>(fn: (_: A) => B, $0: Functor<A>): Functor<B>;
