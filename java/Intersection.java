interface Intersection {
   @SuppressWarnings("null")
   static void main(String[] args) {
      printWrite(new All());
   }

   // yes, you have to have that type parameter
   static <o extends Printable & Writeable> void printWrite(o o) {
      o.print();
      o.write();
   }
}

interface Printable {
   default void print() {
      System.out.println("print()");
   };
}

interface Writeable {
   default void write() {
      System.out.println("write()");
   };
}

interface Sufferable {
   default void suffer() {
      System.out.println("suffer()");
   };
}

class All implements Printable, Writeable, Sufferable {}
