// An attempt at reading standard input without blocking using NIO.
// I didn't think that it would work but it was worth a shot.
// javac STDIN.java --enable-preview --release=13
// java --enable-preview STDIN

import java.nio.channels.*;
import java.nio.ByteBuffer;

class STDIN {
   public static void main(String[] args) {
      var chan = Channels.newChannel(System.in);
      var dest = ByteBuffer.allocate(48);
      int bytesRead = 0;
      do {
         System.out.print("> ");
         try {
            bytesRead = chan.read(dest);
         } catch (Exception e) {
            System.out.println("Bleh");
         }
         dest.flip();
         System.out.printf("%2d bytes: \"", bytesRead);
         
         while (dest.hasRemaining()) {
            var c = (char) dest.get();
            System.out.print(
               switch(c) {
                  case '\r' -> "\\r";
                  case '\n' -> "\\n";
                  default -> c;
               }
            );
         }
         System.out.println('"');
         dest.clear();
      } while (bytesRead != -1);
   }
}
