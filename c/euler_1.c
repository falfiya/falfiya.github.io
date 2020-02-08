#include <stdio.h>

int main() {
   unsigned int i = 1000;
   unsigned long long sum = 0;
   while (i --> 0) {
      if (i % 3 == 0 || i % 5 == 0) {
         sum += i;
      }
   }
   return printf("%llu\n", sum);
}
