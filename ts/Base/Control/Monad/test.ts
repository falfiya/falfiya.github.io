import {fmap} from "./Functor";

import {List} from "./List";
import {None, Some} from "./Maybe";

const add_1 = (x: number) => x + 1;
const is_even = (x: number) => !!(x % 2);

const a = new Some(1);
const b = fmap(add_1, a);

const c = new None;
const d = fmap(add_1, c);

const e = fmap(is_even, b);
const f = fmap(is_even, d);

const g = new List([0, 1, 2]);
const h = fmap(add_1, g);
const i = fmap(is_even, h);

process.stdout.write
(`Control.Monad test:
a = new Some(1)        ; ${a}
b = fmap(add_1, a)     ; ${b}

c = new None           ; ${c}
d = fmap(add_1, c)     ; ${d}

e = fmap(is_even, b)   ; ${e}
f = fmap(is_even, d)   ; ${f}

g = new List([0, 1, 2]); ${g}
h = fmap(add_1, g)     ; ${h}
i = fmap(is_even, h)   ; ${i}
`);
