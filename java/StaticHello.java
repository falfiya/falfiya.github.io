/**
 * This is for testing if URLClassLoader runs the static initializer when
 * loading a class.
 */
final class StaticHello {
   static {
      System.out.println("Hello, World");
   }

   static void main(String[] args){};
}
