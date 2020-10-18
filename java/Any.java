class Any {
   /** void *val */
   private Object val;

   public Any(Object v) {
      this.val = v;
   }

   @SuppressWarnings("unchecked")
   public <T> T val() {
      return (T) this.val;
   }

   public static void main(String[] args) {
      var a = new Any(1);
      var b = new Any(2);

      System.out.println(a.<String>val() + b.<Integer>val());
   }
}
