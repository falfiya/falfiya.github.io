auto RACKET_H_factorial(auto i);
auto factorial = [](auto i) {
   if (i < 2) {
      return i;
   } else {
      return i * RACKET_H_factorial(i - 1);
   }
};
auto RACKET_H_factorial(auto i) {
   return factorial(i);
};

#include <iostream>
int main() {
   std::cout << factorial(12);
}
