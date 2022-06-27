// simple-extended-eta newtypes
// allow easy newtypes using strings instead of unique symbols
export declare const simple_extended_eta: unique symbol;
type data<key extends string, val> = {[simple_extended_eta]: {[k in key]: val}};
type unwrappable<T> = data<"of", T>;
type distinction<uniq_name extends string> = data<"is", uniq_name>;
type unwrap<T> = T extends unwrappable<infer inner> ? inner : T;
type newtype<uniq_name extends string, of> =
   & of
   & unwrappable<of>
   & distinction<uniq_name>;

const animals: animal[] = [];
type animal = newtype<"animal", string>;
namespace animal {
   export function bless(new_animal: string): asserts new_animal is animal {
      animals.push(new_animal as animal);
   }

   export function is(u: unknown): u is animal {
      return animals.includes(u as any);
   }

   export function print(a: animal): void {
      console.log(`${a} is an animal!`);
   }
}

animal.bless("cat");
animal.bless("dog");

declare const input: string;

if (animal.is(input)) {
   animal.print(input);
} else {
   // too bad
}

export {animal, unwrap}
