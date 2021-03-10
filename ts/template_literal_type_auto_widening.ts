// so here we have our newtype idiom
declare const email: unique symbol;
type email = string & {readonly [email]: void};
type foobar = "foo.bar@baz.com" & email;

type contact_information_bad<email_t extends email> = `email: ${email_t}`;
// this should work but it doesn't
type bad_my_email = contact_information_bad<foobar>

// this should also work but it doesn't
type contact_information_worse<email_t extends string> = `email ${email_t}`;
type worse_foobar = contact_information_worse<foobar>;

// this is the best I can figure out now
type upcast<_T extends U, U> = U;
type contact_information_ok<email_t extends email> = `email: ${upcast<email_t, string>}`;
type good_foobar = contact_information_ok<foobar>;

// alternatively:
type primitive<T extends string | number> = T extends string ? string : number;
//> contact_information_also_good ::`email: ${string}`
type contact_information_meh<email_t extends email> = `email: ${primitive<email_t>}`;
