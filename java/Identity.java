/** It's so useless */

class Identity<T> implements java.util.function.Function<T, T> {
   public T apply(T val) {
      return val;
   }
}
