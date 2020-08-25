#include <stdlib.h>
#include <stdio.h>
#define ul unsigned long
#define MAXSIZE 10

int main() {
   ul *o = calloc(MAXSIZE * MAXSIZE / 2, sizeof(ul));
   for (unsigned y = 0; y < MAXSIZE; ++y) {
      ul *row = o + y;
      for (unsigned x = 0; x < MAXSIZE - y; ++x) {
         row[x] = y * x;
         printf("%4lu, ", row[x]);
      }
      puts("");
   }
   return 0;
}
