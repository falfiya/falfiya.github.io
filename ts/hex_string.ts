import {newtype} from "./newtype5/src/newtype5";

type hex_string = newtype<"hex_string">;

type hex_char = `${
   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
   | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
   | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
}`;

// unknown if true
// hex_string if false
type force_hex_chars<s> =
   s extends ""
      ? unknown
      : s extends `${infer first}${infer rest}`
         ? first extends hex_char
            ? force_hex_chars<rest>
            : hex_string
         : never;

// unknown if true
// hex_string if false
type force_hex_string<s> =
   s extends `0x${infer chars}`
      ? force_hex_chars<chars>
      : hex_string;

function hex_string<s extends string>(s: s & force_hex_string<s>): hex_string {
   return s as never;
}

hex_string("0x1aaaa1"); // Type 'string' is not assignable to type 'hex_string'
