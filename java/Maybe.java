abstract sealed class Maybe<T> permits Some<T>, None<T> {
   static None<?> none_singleton = new None<>();

   @SuppressWarnings("unchecked")
   static <T> None<T> nn() {
      return (None<T>) Maybe.none_singleton;
   }

   static void main(String[] args) {
      Maybe<Integer> my_int = nn();
   }

   static <T> boolean is_some(Maybe m) {
      return switch (m) {
         default -> true;
      };
   };

   abstract boolean is_none();
}

final class Some<T> extends Maybe<T> {
   final boolean is_some() { return true; }
   final boolean is_none() { return false; }
}

final class None<T> extends Maybe<T> {
   final boolean is_some() { return false; }
   final boolean is_none() { return true; }
}
