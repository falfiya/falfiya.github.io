// std::visit aka "sad and weak pattern matching"
#include <variant>
#include <iostream>
using namespace std;

template<class> bool always_false_v = false;

int main() {
   variant<int, monostate> var{65535};
   visit([](auto&& inner) {
      using T = decay_t<decltype(inner)>;
      if constexpr (is_same_v<T, int>) {
         cout << "Some(" << inner << ")\n";
      } else if constexpr (is_same_v<T, monostate>) {
         cout << "None\n";
      } else {
         static_assert(always_false_v<T>, "non-exhaustive visitor!");
      }
   }, var);
}
