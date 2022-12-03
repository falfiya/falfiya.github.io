import { newtype, api_in, api_out } from "./newtype5";
type unsigned = (number | bigint) & unknown;
type i32 = number & unknown;
type u32 = i32 & unsigned;
export declare function succ(a: api_in<u32>): api_out<u32>;
export {};
