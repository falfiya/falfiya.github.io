#include <iostream>
using namespace std;

struct cat {
   char const *name;

   void greet() const noexcept {
      cout << this->name << '\n';
   }

   using greet_t = void (*)(cat const *) noexcept;
};

int main() noexcept {
   cat::greet_t static_greet;
   asm (
      "mov %1, %%rdi;"
      "mov %%rdi, %0;"
      :"=r" (static_greet)
      : "r" (&cat::greet )
      :"%rdi"
   );

   cat tom{"tom"};
   static_greet(&tom);
}
