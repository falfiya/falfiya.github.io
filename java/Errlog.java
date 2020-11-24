import java.io.*;

interface Errlog {
   static void main(final String[] args) {
      final var outfile = new File("Errlog.txt");
      try {
         outfile.createNewFile();
         System.setErr(new PrintStream(outfile));
      } catch (Throwable t) {}

      throw new RuntimeException("Let's write this to the file!");
   }
}
