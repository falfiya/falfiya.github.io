import java.util.List;

@SuppressWarnings("unchecked")
public class Objs {
   boolean hasProp1 = false;
   boolean hasProp2 = false;

   List<Integer> prop1;
   List<String> prop2;
   public Objs(short whichProp, List<?> props) {
      switch (whichProp) {
         case 1: {
            this.prop1 = (List<Integer>) props;
            this.hasProp1 = true;
            break;
         }
         case 2: {
            this.prop2 = (List<String>) props;
            this.hasProp2 = true;
            break;
         }
      }
   }

   public <T> Objs(Class<T> clazz, List<T> props) {
      if (clazz.equals(Integer.class)) {
         this.prop1 = (List<Integer>) props;
         this.hasProp1 = true;
      } else if (clazz.equals(String.class)) {
         this.prop2 = (List<String>) props;
         this.hasProp2 = true;
      }
   }
}
