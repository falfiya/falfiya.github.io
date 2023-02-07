primitive class Point implements Shape {
   private double x;
   private double y;

   public Point(double x, double y) {
       this.x = x;
       this.y = y;
   }

   public double x() { return x; }
   public double y() { return y; }

   public Point translate(double dx, double dy) {
       return new Point(x+dx, y+dy);
   }

   public boolean contains(Point p) {
       return equals(p);
   }
}

interface Shape {
   boolean contains(Point p);
}
