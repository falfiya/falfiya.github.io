// the evolution of newtype

declare const alpha: unique symbol;
type alpha = string & {readonly [alpha]: unique symbol};

declare const beta: unique symbol;
type beta = string & {readonly [beta]: void};

module gamma {
   declare const alpha: unique symbol;
   export type alpha<val extends string> = val & {readonly [alpha]: void};

   declare const beta: unique symbol;
   export type beta_newtype = {readonly [beta]: void};
   export type beta = string & beta_newtype;
}

declare const delta: unique symbol;
type delta_newtype = {readonly [delta]: void};
type delta<val extends string> = val & delta_newtype;
