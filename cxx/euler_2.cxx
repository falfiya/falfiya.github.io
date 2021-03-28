#include <iostream>

const uint32_t four_million = 4000000;

constexpr uint_fast64_t compute() {
   uint32_t a(1);
   uint32_t b(1);
   uint32_t c{};
   uint64_t sum{};
   while (c <= four_million) {
      c = a + b;
      if (!(c % 2)) {
         sum += c;
      }
      a = b;
      b = c;
   }
   return sum;
}

int main() {
   std::cout << compute() << std::endl;
}
