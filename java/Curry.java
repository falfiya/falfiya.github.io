import java.util.function.Function;
import java.util.function.BiFunction;

class Add implements BiFunction<Integer, Integer, Integer> {
   public Integer apply(Integer a, Integer b) {
      return a + b;
   }
}

public class Curry<T, U, V> implements Function<BiFunction<T, U, V>, Function<T, Function<U, V>>> {
   public static void main(String[] args) {
      var res = new Curry<Integer, Integer, Integer>().apply(new Add()).apply(1).apply(2);
      System.out.println(res);
   }

   public Function<T, Function<U, V>> apply(BiFunction<T, U, V> inFunction) {
      // (t: T) => (u: U) => V
      return ((T t) -> (U u) -> inFunction.apply(t, u));
   }
}
