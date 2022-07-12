// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html
const lowercase = (s: string) => s.toLowerCase();

const fails_yay: {fn: (u: unknown) => string} = {fn: lowercase};
const works_why: {fn(u: unknown): string} = {fn: lowercase};

class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

declare let f1: (x: Animal) => void;
declare let f2: (x: Dog) => void;
declare let f3: (x: Cat) => void;
f1 = f2; // Ok
f2 = f1; // Ok
f2 = f3; // Ok

// ALL OK IN STRICT HAHAHAHASHAHAHAHASDJKHAHUIDF&*(P#r892389y89u2389u234)

// Blue balled again :Cults:
