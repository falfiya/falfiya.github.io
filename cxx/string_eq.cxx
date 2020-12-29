#include <cstdio>
using str = char const *;

constexpr bool eq(str a, str b) noexcept {
   while (*a && *b) {
      if (*a++ != *b++) {
         return false;
      }
   }
   return true;
}

int main() {
   constexpr auto same{eq("hello", "hello")};
   printf("%i\n", same);
}
