#include <iostream>

inline auto iota = [i = 0]() mutable { return i++; };

int main() {
   auto a{iota()};
   auto b{iota()};
   auto c{iota()};

   std::cout <<
      "a = " << a << "\n"
      "b = " << b << "\n"
      "c = " << c << "\n";
}
