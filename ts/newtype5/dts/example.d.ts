import { newtype, unwrap } from "./newtype5";
type unsigned = (number | bigint) & unknown;
type i32 = number & unknown;
type u32 = i32 & unsigned;
export declare function seconds_string(u: u32): `seconds: ${u32}`;
export declare function succ(a: u32): u32;
export {};
