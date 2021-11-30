interface BreakForwards {
   static void main(String[] $) {
      L0: {
         System.out.println("Hello!");
         if (Math.random() > .5) break L0;
         System.out.println("Goodbye!");
      }
   }
}
