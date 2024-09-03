abstract class MakeOneOfMe1 {
   abstract makeOneOfMe(): MakeOneOfMe1;
}
class Dog extends MakeOneOfMe1 {
   override makeOneOfMe() {
      return new Dog();
   }
}

class Cat extends MakeOneOfMe1 {
   override makeOneOfMe() {
      return new Dog(); // <-- Oh No
   }
}

abstract class MakeOneOfMe2 {
   abstract makeOneOfMe(): this;
}
class Turtle extends MakeOneOfMe2 {
   override makeOneOfMe(): Turtle { // <- Oh No
      return new Turtle();
   }
}

abstract class MakeOneOfMe3 {
   myClass: this = this;

   abstract makeOneOfMe(): this["myClass"];
}
class Leopard extends MakeOneOfMe3 {
   override makeOneOfMe(): this["myClass"] {
      return new Leopard();
   }
}
