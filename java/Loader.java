import java.io.IOException;

import java.net.*;
import java.util.*;
import java.nio.file.*;
import static java.lang.System.*;

class Loader {
   private static String basename(String s) {
      return s.substring(0, s.lastIndexOf('.'));
   }
   public static void main(String a[]) throws IOException, ClassNotFoundException {
      var abspath = Paths.get(".").toAbsolutePath();
      out.println("Searching for .class files in " + abspath);
      var paths = Files.walk(abspath);
      String[] classFiles = paths
         .filter(Files::isRegularFile)
         .map(f -> f.getFileName().toString())
         .filter(f -> f.endsWith(".class"))
         .toArray(String[]::new);
      paths.close();

      var i = 0;
      for (var clazz : classFiles) {
         out.printf("%2d: %s\n", i++, clazz);
      }


      var loader = URLClassLoader.newInstance(
         new URL[] { abspath.toUri().toURL() }
      );

      var sc = new Scanner(System.in);

      var len = classFiles.length;
      while (true) {
         out.print("> ");

         String line;
         try {
            line = sc.nextLine();
         } catch (IllegalStateException e) {
            err.println("Scanner error");
            continue;
         } catch (NoSuchElementException e) {
            err.println("No input");
            continue;
         }

         int selectedIndex;
         try {
            selectedIndex = Integer.parseInt(line);
         }  catch (NumberFormatException e) {
            err.println("Could not parse '" + line + "' as integer");
            continue;
         }

         if (selectedIndex == -1) {
            return;
         }

         if (selectedIndex < 0) {
            err.println("The selected index must be a positive integer");
            continue;
         }

         if (selectedIndex >= len) {
            err.println("The selected index must be less than " + len);
            continue;
         }

         var selectedClassName = classFiles[selectedIndex];
         var classNameMaybe = basename(selectedClassName);

         try {
            Class<?> clazz;
            try {
               clazz = loader.loadClass(classNameMaybe);
            } catch (ClassNotFoundException e) {
               err.println("ClassNotFound: " + e.getMessage());
               continue;
            } catch (NoClassDefFoundError e) {
               err.println(e.getMessage());
               continue;
            }

            var main = clazz.getMethod("main", String[].class);
            Object args = new String[]{ classNameMaybe };
            main.invoke(null, args);
            return;
         } catch (Exception e) {
            e.printStackTrace();
            continue;
         }
      }
   }
}
