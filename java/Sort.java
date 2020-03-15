import java.util.Arrays;

class Sort {
   public static void main(String[] args) {
      Arrays.sort(args, String::compareTo);
      for (var arg : args) {
         System.out.print(arg + " ");
      }
   }
}
