interface CountUp {
   static int count_up(int max)[] {
      var out = new int[max];
      for (int i = 0; i < max; ++i) {
         out[i] = i;
      }
      return out;
   }

   static void main(String args[]) {
      for (int v : count_up(10)) {
         System.out.println(v);
      }
   }
}
