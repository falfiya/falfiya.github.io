#include <iostream>

// I've known about this "feature" for a while but after showing it to someone
// today, I figured that I'd make this

class Friendly {
   char const * private_key;
   constexpr explicit Friendly(char const * key) noexcept: private_key(key) {}
   friend int main();
};

int main() {
   Friendly fren("secret");
   std::cout << fren.private_key << '\n';
}
