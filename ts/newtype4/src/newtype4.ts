declare const simple_extended_eta: unique symbol;

type data<key extends string, val> = {[simple_extended_eta]: {[k in key]: val}};
type unwrappable<T> = data<"of", T>;
type distinction<uniq_name extends string> = data<"is", uniq_name>;
type unwrap<T> = T extends unwrappable<infer inner> ? inner : T;
type newtype<uniq_name extends string, of> =
   & of
   & unwrappable<of>
   & distinction<uniq_name>;

export {unwrap, newtype};
