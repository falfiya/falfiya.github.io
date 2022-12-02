import { newtype, api_in, api_out } from "./newtype5";
type unsigned = (number | bigint) & newtype<"unsigned">;
type i32 = number & newtype<"i32">;
type u32 = i32 & unsigned;
export declare function succ(a: api_in<u32>): api_out<u32>;
export {};
