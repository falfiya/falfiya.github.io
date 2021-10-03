#include <iostream>

struct no_address_lol {};
constexpr inline no_address_lol *operator&(no_address_lol &) noexcept {
   return nullptr;
}

int main() noexcept {
   no_address_lol scrumge;
   std::cout
      << &scrumge << '\n'
      // no std::addressof in freestanding :scrange:
      << __builtin_addressof(scrumge) << '\n';
}
