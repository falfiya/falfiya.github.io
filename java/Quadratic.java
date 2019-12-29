// This thing only really works on VT100 compliant terminals iirc.

import java.util.Scanner;
import java.io.IOException;

class TermColor {
   static String New(int i) {
      return String.format("\033[%dm", i);
   }
}

class Term {
   static void clear() {
      System.out.print("\033[3J\033[H\033[2J");
   }
}

interface Colors {
   String reset = TermColor.New(0);
   String red = TermColor.New(31);
   String cyan = TermColor.New(36);
   String grey = TermColor.New(90);
   String lred = TermColor.New(91);
   String orange = TermColor.New(33);
   String purple = TermColor.New(35);
}

class Quadratic {
   static void puts(String s) { System.out.println(s); }
   static void printfl(String s, Object... a) { System.out.printf(s + Colors.reset + '\n', a); }

   static void printeq(String... v) {
      printfl(
         "%s%sx%s² %s+ %s%sx %s+ %s %s= %s0",
         v[0],
         Colors.grey,
         Colors.orange,
         Colors.red,
         v[1],
         Colors.grey,
         Colors.red,
         v[2],
         Colors.red,
         Colors.purple
      );
   }

   static Scanner sc = new Scanner(System.in);

   static int prompt(String v) {
      System.out.printf("%s%s%s = %s", Colors.cyan, v, Colors.red, Colors.lred);
      int i = sc.nextInt();
      Term.clear();
      return i;
   }

   public static void main(String[] args) throws IOException {
      Term.clear();
      var _a = Colors.cyan + "a";
      var _b = Colors.cyan + "b";
      var _c = Colors.cyan + "c";
      printeq(_a, _b, _c);
      int a = prompt("a");
      printeq(_a = Colors.purple + Integer.toString(a), _b, _c);
      int b = prompt("b");
      printeq(_a, _b = Colors.purple + Integer.toString(b), _c);
      int c = prompt("c");
      printeq(_a, _b, _c = Colors.purple + Integer.toString(c));
      var discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
         printfl("%sx%s has no real solutions", Colors.grey, Colors.reset);
         System.exit(1);
      }
      var sd = Math.sqrt(discriminant);
      var a2 = 2 * a;
      var plus = (sd - b) / a2;
      if (discriminant == 0) {
         printfl(
            "%sx %s= %sn",
            Colors.grey,
            Colors.red,
            Colors.lred + plus
         );
      } else {
         printfl(
            "%sx %s has two solutions: %s{%s, %s}",
            Colors.grey,
            Colors.reset,
            Colors.purple,
            Colors.lred + plus + Colors.grey,
            Colors.lred + ((-sd - b) / a2) + Colors.purple
         );
      }
   }
}
