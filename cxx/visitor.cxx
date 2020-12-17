// std::visit aka "sad and weak pattern matching"
#include <variant>
#include <iostream>
using namespace std;

template<class> bool always_false_v = false;

template<class... Ts> struct overloaded : Ts... { using Ts::operator()...; };
template<class... Ts> overloaded(Ts...) -> overloaded<Ts...>;

int main() {
   variant<int, monostate> var0{65535};
   visit([](auto&& inner) {
      using T = decay_t<decltype(inner)>;
      if constexpr (is_same_v<T, int>) {
         cout << "Some(" << inner << ")\n";
      } else if constexpr (is_same_v<T, monostate>) {
         cout << "None\n";
      } else {
         static_assert(always_false_v<T>, "non-exhaustive visitor!");
      }
   }, var0);

   variant<double, monostate> var1{0.5};
   visit(overloaded {
      [](auto _) { cout << "Something else???\n"; },
      [](int i) { cout << "Some(" << i << ")\n"; },
      [](monostate _) { cout << "None\n"; }
   }, var1);
}
