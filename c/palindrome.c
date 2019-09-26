#include <unistd.h>
#define write1(c) write(1, c, 1)
#define printl(s, l) write(1, s, l)
#define putsl(s, l) printl(s, l); write1("\n")

/// These macros require compile time (char *)
#define print(s) printl(s, sizeof(s) - 1)
#define puts(s) print(s "\n")
/// Half of a size_t
#define hsize_t __uint32_t

int main() {
   start:;
   print("> ");
   unsigned bufsize = 256;
   size_t length = 0;
   char *line = sbrk(bufsize * sizeof(char));
   io:
   if (length == bufsize) {
      sbrk(bufsize);
      bufsize *= 2;
   }
   register char *c = line + length++;
   read(0, c, 1);
   if (*c != '\n') {
      goto io;
   }
   hsize_t half_length = --length / 2;
   print("\"");
   printl(line, length);
   print("\" is ");
   loop:
   if (half_length--) {
      if (half_length[line] == line[length - half_length]) {
         goto loop;
      }
      print("not ");
   }
   puts("a palindrome.\n");
   goto start;
}
