#include <unistd.h>
#include <stdint.h>

#define write1(c) write(1, c, 1)
#define printl(s, l) write(1, s, l)
#define putsl(s, l) printl(s, l); write1("\n")

/// These macros require compile time (char *)s
#define print(s) printl(s, sizeof(s) - 1)
#define puts(s) print(s "\n")

// keep track of the original buffer size so we can return the heap to that
#define ori_bufsize 256
int main() {
   // allocate 256 bytes of memory
   // you probably don't need any more but whatever
   char *line = sbrk(ori_bufsize);
   start:;
   print("> ");
   uint16_t bufsize = ori_bufsize;
   size_t length = 0;
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
   // reached the end of input
   // remove the newline when calculating midway of string
   register size_t half_length = --length / 2;
   print("\"");
   printl(line, length);
   print("\" is ");
   loop:
   if (half_length) {
      if (line[half_length] == line[length - half_length - 1]) {
         half_length--;
         goto loop;
      }
      print("not ");
   }
   // return the heap to the ori_bufsize
   sbrk(ori_bufsize - bufsize);
   puts("a palindrome.\n");
   goto start;
}
