import static java.lang.System.*;

interface SumTypesFinally {
   static void main(String[] $) {
      final var a = new Circle(5);
      final var b = new Rectangle(2, 3);
      final var c = new Triangle(5, 6);
      out.println("The area of " + a + " is " + Shape.area(a));
      out.println("The area of " + b + " is " + Shape.area(b));
      out.println("The area of " + c + " is " + Shape.area(c));
   }
}

sealed interface Shape {
   static float area(Shape s) {
      return switch (s) {
         case Circle c -> (float) Math.PI * c.circumference() * c.circumference();
         case Rectangle r -> r.base() * r.height();
         case Triangle t -> t.base() * t.height() / 2;
      };
   }
}
record Circle(float circumference) implements Shape {}
record Rectangle(float base, float height) implements Shape {}
record Triangle(float base, float height) implements Shape {}
