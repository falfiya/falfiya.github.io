// so here we have our newtype idiom
declare const email: unique symbol;
type email = string & {readonly [email]: void};

// this should work but it doesn't
//> contact_information_bad :: string
// type contact_information_bad<email extends email> = `email: ${email}`;

type upcast<_T extends U, U> = U;

//> contact_information_good ::`email: ${string}`
type contact_information_good = `email: ${upcast<email, string>}`;

// alternatively:

type primitive<T extends string | number> = T extends string ? string : number;

//> contact_information_also_good ::`email: ${string}`
type contact_information_also_good = `email: ${primitive<email>}`;
