import {fmap} from "./Functor";
import {none} from "./Maybe";

const add_1 = (x: number) => x + 1;

const still_either = fmap(add_1, none);
