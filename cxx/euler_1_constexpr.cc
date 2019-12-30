#include <iostream>

constexpr uint_least32_t compute() {
   uint16_t i(1000);
   uint_least32_t sum(0);
   while (i --> 0) {
      if (i % 3 == 0 || i % 5 == 0) {
         sum += i;
      }
   }
   return sum;
}

int main() {
   std::cout << compute() << std::endl;
}
