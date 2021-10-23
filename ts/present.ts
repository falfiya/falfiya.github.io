type e = {
   a?: number;
   b?: string;
};

type Present<T, ks extends keyof T> = T & {[P in ks]-?: T[P]};

declare const q: Present<e, "a" | "b">;
