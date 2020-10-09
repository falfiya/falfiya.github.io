import java.util.function.Function;

class TypeAlias<fn extends Function<Integer, Boolean>> {
   public static void main(String String[]) {
      new TypeAlias<>().run((i) -> true);
      staticRun();
   }

   public static <fn extends Function<Integer, Boolean>> void staticRun() {
      fn a;
      fn b;
   }

   void run(fn fn) {
      fn.apply(1);
   }
}
