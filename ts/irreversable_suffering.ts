export {};
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html
const lowercase = (s: string) => s.toLowerCase();

const fails_yay: {fn: (u: unknown) => string} = {fn: lowercase};
const works_why: {fn(u: unknown): string} = {fn: lowercase};

class Animal {}
// you need fields on these because otherwise they're just casted to an empty
// interface
class Dog extends Animal {
   dog: true = true;
}
class Cat extends Animal {
   cat: true = true;
}

declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;
f1 = f2; // errors in strict mode
f2 = f1; // Ok
f2 = f3; // never ok

// Blue balled again :Cults:
