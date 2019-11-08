#include "stdio.h"

int main() {
   int ary[] = {0, 1, 2, 3, 4, 5, 6};
   printf("%d\n", 6[ary]); // blursed
   char *hello = {'h', 'e', 'l', 'l', 'o', '\0'};
   printf("%s\n", hello);
}
