#warning libc considered harmful!
#include<stdio.h>

char *get_next_token(char *beg, char delimiter, char **next) {
   char *end = beg;
   while (*end != delimiter) {
      if (*end == '\0') {
         *next = end;
         return beg;
      }
      ++end;
   }
   *end = '\0';
   *next = end + 1;
   return beg;
}

int main(void) {
   char str[] = "hello world !";
   char *cur = str;
   while (*cur != '\0') {
      puts(get_next_token(cur, ' ', &cur));
   }
}
