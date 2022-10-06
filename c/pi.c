#include <stdio.h>
#include <math.h>

int main(void) {
   for (int n = 2; n <= (1 << 20); n *= 2) {
      double pi_over_4 = 0;
      for (int k = 0; k <= n; k++){
         pi_over_4 += (pow(-1.0, k)) / ((2.0 * k) + 1.0);
      }
      printf("pi = %.15f | n = %7d\n", pi_over_4 * 4, n);
   }
}
