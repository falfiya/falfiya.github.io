import java.util.ArrayList;

class Wrong {
   static <T> T unsoundCast(Object x) {
      return (T) x;
   }

   // mozambique
   public static void main(String ...args) {
      ArrayList<String> stringList = new ArrayList<>();
      Wrong.<ArrayList<Integer>>unsoundCast(stringList).add(1);
   };
}
