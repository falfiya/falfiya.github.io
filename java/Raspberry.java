import java.util.function.BiPredicate;

interface Raspberry {
   static void main(String[] args) {
      if (args.length < 2) {
         System.err.println("You must provide two arguments.");
         return;
      }
      BiPredicate<String, String> eq = String::equals;
      System.out.printf("\"%s\" == \"%s\" //> %b\n",
         args[0],
         args[1],
         eq.test(args[0], args[1])
      );
   }
}
