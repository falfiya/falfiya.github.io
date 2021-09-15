declare const unwrappable_to: unique symbol;

type unwrappable_to<base = unknown> = {[unwrappable_to]: base};

type unwrap2<T extends unwrappable_to> =
   T extends infer val & T[typeof unwrappable_to] ? val : never;

const unwrap2 =
   <T extends unwrappable_to>(T: T): unwrap2<T> =>
      T as any;

declare const i32_us: unique symbol;
// you have to export this _s type otherwise the typescript compiler complains
// that things cannot be named, whatever that means
type i32_s = {[unwrappable_to]: i32_s; [i32_us]: void};
type i32<val extends number = number> = i32_s & val;
const i32 = <val extends number>(val: val): i32<val> => {
   if (Number.isInteger(val)) {
      return ~~val as any;
   }
   throw new TypeError(`${val} is not an Integer!`);
};

const one = i32(1);
const two = i32(2);

type one_val = unwrap2<typeof one>;
const one_val = unwrap2(one);

const add_only_i32 =
   <a extends number, b extends number>(a: i32<a>, b: i32<b>): i32 =>
      (a + b) as unknown as i32;

const three = add_only_i32(one, two);

declare const special_string_us: unique symbol;
type special_string_s = {[unwrappable_to]: special_string_s; [special_string_us]: void};
type special_string<s extends string = string> = special_string_s & s;
const special_string = <s extends string>(s: s): special_string<s> => {
   return s as any;
};

const hello = special_string("hello");
const world = special_string("world");

type add_special_strings<a extends special_string, b extends special_string> =
   special_string<`${unwrap2<a>} ${unwrap2<b>}`>;

type hello_world = add_special_strings<typeof hello, typeof world>;

const add_special_strings =
   <a extends string, b extends string>(a: special_string<a>, b: special_string<b>):
      special_string<`${a} ${b}`> =>
         `${a} ${b}` as any;

const hello_world = add_special_strings(hello, world);

declare const something: special_string;

type hello_something = add_special_strings<typeof hello, typeof something>;
const hello_something = add_special_strings(hello, something);
