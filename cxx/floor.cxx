#include <stdio.h>

#define floor long

int main() {
   double d;
   printf("floor> ");
   scanf_s("%lf", &d, 50);
   printf("%ld\n", floor(d));
}
