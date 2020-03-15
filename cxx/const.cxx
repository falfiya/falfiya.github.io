#include <iostream>

constexpr size_t len(char const *s) {
   size_t l{};
   char c{};
   while ((c = *s++) != '\0') {
      l++;
   }
   return l;
}

static constexpr char const *my_string = "Hello, World!\n";
int main() {
   static_assert(len(my_string) == 14, "It's fourteen characters");
   std::cout
   << '"' << my_string << '"'
   << "is " << len(my_string)
   << " characters long.\n";
   return 0;
}
