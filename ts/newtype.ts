declare const _: unique symbol;

type newtype = string & { readonly [_]: unique symbol };

const yes: newtype = "This language is fscking great" as newtype;
