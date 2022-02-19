export type Present<T, ks extends keyof T> = T & {[P in ks]-?: T[P]};
