#include <iostream>
using namespace std;

struct duck {
   int const age;
   char const *type;

   void info() const noexcept {
      cout << "The " << this->type << " duck is " << this->age << " years old\n";
   }

   using info_t = void (*)(void const *self) noexcept;
};

struct bunny {
   int const weight;
   char const *name;
};

int main() noexcept {
   duck::info_t info;

   asm (
      "mov %1, %%rdi;"
      "mov %%rdi, %0;"
      :"=r" (info)
      : "r" (&duck::info)
      :"%rdi"
   );

   duck random_duck{.age = 3, .type = "mallard"};
   random_duck.info();
   info(&random_duck);

   bunny flopsy{.weight = 10, .name = "flopsy"};
   info(&flopsy);
}
