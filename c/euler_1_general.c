#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
   int i;
   char* PROGRAM_NAME = *argv++;
   if (argc != 2 || (i = atoi(*argv)) < 0) {
      printf(
         "%s n\n"
         "Where n is a natural number.\n"
         "Computes the sum of all natural numbers that are the sum of either "
         "3 or five below n.\n",
         PROGRAM_NAME
      );
      return 1;
   }
   unsigned long long sum = 0;
   while (i --> 0) {
      if (i % 3 == 0 || i % 5 == 0) {
         sum += i;
      }
   }
   printf("%llu\n", sum);
}
