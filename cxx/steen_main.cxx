// stéén sent me this
#include <iostream>

namespace Program {
   struct Program {
      int main(char const *argv[]) noexcept asm("main");
   };

   int Program::main(char const *argv[]) noexcept {
      int argc{static_cast<int>(reinterpret_cast<size_t>(this))};

      while (argc --> 0) {
         std::cout << *argv++ << '\n';
      }

      return 0;
   }
};
