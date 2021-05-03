abstract sealed class Shape permits Circle, Rectangle {}

final class Circle extends Shape {
   int radius;
}

final class Rectangle extends Shape {
   int width;
   int height;
}

interface Sealed {
   static double getArea(Shape shape) {
      return switch (shape) {
         case Circle c    -> Math.pow(c.radius, 2) * Math.PI
         case Rectangle r -> r.width * r.height
      };
   }
   static void main(String[] args) {
      var circle = new Circle();
      circle.radius = 5;
      System.out.println("Area of a Circle is " + Sealed.getArea(circle));
   }
}
