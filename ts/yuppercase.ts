// if you actually wanted to implement this correctly:
// See section 3.13 "Default Case Algorithms" of the Unicode Standard
// https://www.unicode.org/versions/Unicode13.0.0/ch03.pdf
// Here are some other helpful things:
// https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt
// to read the above you need https://www.unicode.org/L2/L1999/UnicodeData.html
// https://www.unicode.org/Public/UCD/latest/ucd/CaseFolding.txt
// https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt

type mapping = {
   a: "A", b: "B", c: "C", d: "D", e: "E", f: "F", g: "G", h: "H", i: "I",
   j: "J", k: "K", l: "L", m: "M", n: "N", o: "O", p: "P", q: "Q", r: "R",
   s: "S", t: "T", u: "U", v: "V", w: "W", x: "X", y: "Y", z: "Z",
};
type Cuppercase<s extends string> = s extends keyof mapping ? mapping[s] : s;

type Yuppercase<s extends string> =
   s extends `${infer head}${infer tail}`
      ? `${Cuppercase<head>}${Yuppercase<tail>}`
      :  s;

type example = Uppercase<`Hello, World!`>;
