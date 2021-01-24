declare const newtype: unique symbol;

type newtype = string & {readonly [newtype]: unique symbol};

const yes: newtype = "This language is fscking great" as newtype;
