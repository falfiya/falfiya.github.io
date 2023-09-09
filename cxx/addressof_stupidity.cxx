#include <iostream>

struct no_address_lol {};
constexpr inline no_address_lol *operator&(no_address_lol &) noexcept {
   return nullptr;
}

template <typename T>
constexpr inline T *addressof(T &t) noexcept {
   return reinterpret_cast<T *>(&reinterpret_cast<char &>(t));
}

int main() noexcept {
   no_address_lol scrumge;
   std::cout
      << &scrumge << '\n'
      // no std::addressof in freestanding :scrange:
      << addressof(scrumge) << '\n'
      << __builtin_addressof(scrumge) << '\n';
}
