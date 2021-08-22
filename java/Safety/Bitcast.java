package Safety;
import sun.misc.Unsafe;
import java.lang.reflect.Field;

class Bitcast {
   static Unsafe unsafe = null;
   static {
      try {
         Field f;

         f = Unsafe.class.getDeclaredField("theUnsafe");
         f.setAccessible(true);
         unsafe = (Unsafe) f.get(null);
      } catch (Exception any) {}
   }

   static Object longToObject(long lng) {
      final Object[] qwordPtr = {null};
      final long baseOffset = unsafe.arrayBaseOffset(Object[].class);
      unsafe.putLong(qwordPtr, baseOffset, lng);
      return qwordPtr[0];
   }

   static long objectToLong(Object obj) {
      // irritating, the jvm will dereference obj when it is put into an array
      // this means that the code won't work
      Object[] qwordPtr = {obj};
      final long baseOffset = unsafe.arrayBaseOffset(Object[].class);
      return unsafe.getLong(qwordPtr, baseOffset);
   }

   public static void main(String[] args) {
      Object fourtyTwo = longToObject(42L);
      System.out.println(objectToLong(fourtyTwo));
   }
}
