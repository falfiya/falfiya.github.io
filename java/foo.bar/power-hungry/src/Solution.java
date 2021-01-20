import java.util.ArrayList;
import java.math.BigInteger;
import java.util.Collections;

public class Solution {
   public static void main(String[] args) {
      System.out.println(solution(new int[]{0, 1, -2, 3, -2, -2, -5, -9900}));
   }
   public static String solution(int[] xs) {
      var pos = new ArrayList<Integer>(xs.length);
      var neg = new ArrayList<Integer>(xs.length);

      for (var panel : xs) {
         if (panel > 0) {
            pos.add(panel);
         } else if (panel < 0) {
            neg.add(panel);
         }
      }

      Collections.sort(neg);

      // if there are an odd number of negative ones
      var size = neg.size();
      if (size % 2 != 0) {
         System.out.println("removed " + neg.remove(size - 1));
      }

      System.out.println(neg.size());

      var product = BigInteger.ONE;
      for (int p : pos) {
         product = product.multiply(BigInteger.valueOf(p));
      }

      for (int n : neg) {
         product = product.multiply(BigInteger.valueOf(n));
      }

      return product.toString();
   }
}
