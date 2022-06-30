import type {unwrap} from "./newtype4";
import type {cats1 as cats1_internal, cats2 as cats2_internal} from "./internal";

export type kats1 = unwrap<cats1_internal>;
export type kats2 = unwrap<cats2_internal>;
