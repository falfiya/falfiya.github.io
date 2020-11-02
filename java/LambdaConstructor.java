import java.util.function.Function;

class LambdaConstructor {
   public static void main(String[] args) {
      nom(LambdaConstructor::new);
   }

   static void nom(Function<String, LambdaConstructor> fn) {
      fn.apply("Hello, World").print();
   }

   String val;
   LambdaConstructor(String val) {
      this.val = val;
   }

   void print() {
      System.out.println(this.val);
   }
}
