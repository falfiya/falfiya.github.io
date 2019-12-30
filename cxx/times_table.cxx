#include <stdio.h>
using uint = unsigned;

auto main() -> int {
   uint times_table[11][11]{};
   for (uint y = 1; y <= 11; ++y) {
      for (uint x = 1; x <= 11; ++x) {
         auto c = y * x;
         times_table[y - 1][x - 1] = c;
         printf("%4d ", c);
      }
      putc('\n', stdout);
   }
}
