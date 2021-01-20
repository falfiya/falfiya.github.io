import java.util.ArrayList;

public class Solution {
   static int nearestSquare(int i) {
      return (int) Math.pow(Math.floor(Math.sqrt(i)), 2);
   }

   public static int[] solution(int left) {
      ArrayList<Integer> out = new ArrayList<>();
      while (left != 0) {
         int a = nearestSquare(left);
         out.add(a);
         left -= a;
      }
      return out.stream().mapToInt((i) -> i).toArray();
   }
}
