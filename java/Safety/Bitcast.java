package Safety;
import sun.misc.Unsafe;
import java.lang.reflect.Field;

class Bitcast {
   Object obj;
   Bitcast(Object obj) {
      this.obj = obj;
   }
   static long objBaseOffset;

   static Unsafe unsafe = null;
   static {
      try {
         Field f;

         f = Unsafe.class.getDeclaredField("theUnsafe");
         f.setAccessible(true);
         unsafe = (Unsafe) f.get(null);

         f = Bitcast.class.getDeclaredField("obj");
         objBaseOffset = unsafe.objectFieldOffset(f);
      } catch (Exception any) {
         System.exit(1);
      }
   }

   static Object longToObject(long lng) {
      final var qwordPtr = new Bitcast(null);
      unsafe.putLong(qwordPtr, objBaseOffset, lng);
      return qwordPtr.obj;
   }

   static long objectToLong(Object obj) {
      final var qwordPtr = new Bitcast(obj);
      return unsafe.getLong(qwordPtr, objBaseOffset);
   }

   public static void main(String[] args) {
      Object fourtyTwo = longToObject(42L);
      System.out.println(objectToLong(fourtyTwo));
   }
}
