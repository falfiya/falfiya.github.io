declare const wrapped: unique symbol;
type wrapped<T> = {readonly [wrapped]: T};

type greeting = wrapped<"hello, world!">;

// why can't we have higher kinded types??
type unwrap<T> = T extends wrapped<infer T> ? T : never;

type g = unwrap<greeting>;
