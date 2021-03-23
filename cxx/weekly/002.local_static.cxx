// https://godbolt.org/z/jj97coh7G

#include <cstdio>
using namespace std;

struct with_a_constructor {
   with_a_constructor() noexcept {
      printf("with_a_constructor");
   }
};

with_a_constructor const &get() noexcept {
   // branch each time we enter `get` to check if v has already been initialized
   static const with_a_constructor v{};
   return v;
}

template <class T>
extern void save(T);

int main() noexcept {
   for (size_t i{}; i < 200; ++i) {
      save(get());
   }
}
