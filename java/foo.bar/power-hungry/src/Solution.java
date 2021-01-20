import java.util.ArrayList;
import java.math.BigInteger;
import java.util.Collections;

public class Solution {
   public static String solution(int[] xs) {
      var pos = new ArrayList<Integer>(xs.length);
      var neg = new ArrayList<Integer>(xs.length);

      for (var panel : xs) {
         if (panel < 0) {
            neg.add(panel);
         } else {
            // this includes zeros
            pos.add(panel);
         }
      }

      Collections.sort(neg);

      var pos_size = pos.size();
      var neg_size = neg.size();
      // for things like {-3}
      if (pos_size == 0 && neg_size == 1) {
         return Integer.toString(neg.get(0));
      }

      if (neg_size % 2 != 0) {
         neg.remove(neg_size - 1);
         neg_size--;
      }

      var pos_a = pos
         .stream()
         .mapToInt(i -> i)
         .filter(i -> i != 0)
         .toArray();

      if (pos_a.length == 0 && neg_size == 0) {
         return "0";
      }

      var product = BigInteger.ONE;
      for (int p : pos_a) {
         product = product.multiply(BigInteger.valueOf(p));
      }

      for (int n : neg) {
         product = product.multiply(BigInteger.valueOf(n));
      }

      return product.toString();
   }
}
