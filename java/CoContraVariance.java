import java.util.*;

import static java.lang.System.out;

interface CoContraVariance {
   static final Animal animal = new Animal();
   static final Feline feline = new Feline();
   static final Kitten kitten = new Kitten();
   static final Serval serval = new Serval();
   static final Jackal jackal = new Jackal();

   static void main(final String[] args) {
      final var mixedList = List.<Animal>of(animal, feline, kitten, serval, jackal);
      final var kittens = Collections.nCopies(3, kitten);

      printAnimalNames0(mixedList);

      printAnimalNames1(mixedList); //:: Animal
      printAnimalNames1(kittens); //:: Kitten
   }

   /// Covariance

   static void printAnimalNames0(final List<? extends Animal> animals) {
      out.println("<printAnimalNames0>");
      animals.forEach(Animal::sayName);
      out.println("</printAnimalNames0>");
   }

   /**
    * There are only two times where this form is useful
    * 1. you have a long base type and you want to alias it
    * 2. you plan to return T like I do here
    */
   static <T extends Animal> T printAnimalNames1(final List<T> animals) {
      out.println("<printAnimalNames1>");
      animals.forEach(T::sayName);
      out.println("</printAnimalNames1>");
      return null;
   }

   static void addServal0(final List<? extends Animal> animals) {
      // cannot do this, what if the list was only of Jackals?
      //animals.add(serval);
   }

   // well, we can ignore the warning
   @SuppressWarnings("unchecked")
   static <T extends Animal> void addServal1(final List<T> animals) {
      animals.add((T) serval);
   }

   /// Contravariance

   /**
    * This simply does not work since the things within this list can be Object
    */
   static void printAnimalNames2(final List<? super Animal> animals) {
      //animals.forEach(Animal::sayName);
   }

   static void addServal2(List<? super Serval> servals) {
      // we can add into the list because the only guarantee is that the lowest
      // object is a serval
      servals.add(serval);

      // we could not, for instance, do either of these:
      //servals.add(jackal);
      // neither are a super class of Serval and it would seem ridiculous to add
      // a Jackal into a list of Servals.
   }

   // this does not work. for some reason, they have decided not to allow this
   // in type parameters because we can't have nice things.
   //static <T super Serval> void addServal3(...);
}

class Animal {
   void sayName() {
      out.println("Animal");
   }
}

class Feline extends Animal {
   void sayName() {
      out.println("Feline");
   }
   void meow() {
      out.println("Meow!");
   }
}

class Kitten extends Feline {
   void sayName() {
      out.println("Kitten");
   }
   void meow() {
      out.println("Meew!");
   }
}

class Serval extends Feline {
   void sayName() {
      out.println("Serval");
   }
   void meow() {
      out.println("Mrrrr!");
   }
}

class Jackal extends Animal {
   void sayName() {
      out.println("Jackal");
   }
}
