// simple-extended-eta newtypes
// allow easy newtypes using strings instead of unique symbols
export declare const simple_extended_eta: unique symbol;
type unwrap<T>
   = T extends {[simple_extended_eta]: {of: infer inner}} ? inner : T;
type newtype<uniq_name extends string, of>
   = of & {[simple_extended_eta]: {is: uniq_name, of: unwrap<of>}}

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
