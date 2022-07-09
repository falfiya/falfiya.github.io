// this doesn't actually work lol but we can pretend it does

import {Constructor} from "../../Kind";
interface ArrayConstructor extends Constructor {
   T: this[0][];
}

declare module "./Functor" {
   interface fmap_t extends FunctorKind<ArrayConstructor> {}
}
