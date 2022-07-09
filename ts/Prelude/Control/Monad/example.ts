import {fmap} from "./Functor";
import {None, Some} from "./Maybe";

const add_1 = (x: number) => x + 1;
const to_str = (x: any) => `${x}`;

const some_1 = new Some(1);
const some_2 = fmap(add_1, some_1);
const still_none = fmap(add_1, None);
const maybe_string = fmap(to_str, some_2);

const not_counting = [0, 1, 2];
const counting = fmap(add_1, not_counting);
const strings = fmap(to_str, not_counting);
