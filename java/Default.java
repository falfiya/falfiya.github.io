import java.lang.annotation.*;

abstract interface ProgramName {
   default String programName() {
      return "coalpha.java.Default";
   }
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Hello {
   String hello() default "Hello";
}

@Hello
class Default implements ProgramName {
   public static void main(String args[]) {
      {
         var instance = new Default();
         System.out.println(instance.programName());
      }

      try {
         System.out.println(Default.class.getAnnotation(Hello.class).hello());
      } catch (Exception e) {};
   }
}
