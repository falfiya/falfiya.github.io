// std::visit aka "sad and weak pattern matching"
// someone explain to me why there're differences between using decay_t and not.
#include <variant>
#include <iostream>
#include "./type_name.cxx"
using namespace std;

template<class> inline constexpr bool always_false_v = false;

static auto visitor_nodecay = [](auto&& inner) {
   using T = decltype(inner);
   auto name{type_name<T>()};
   cout
      << "\nusing T = " << name
      << "\nis_same_v<T, int&>       = " << is_same_v<T, int&>
      << "\nis_same_v<T, monostate&> = " << is_same_v<T, monostate&>
      << '\n';
};

static auto visitor_decay = [](auto&& inner) {
   using T = decay_t<decltype(inner)>;
   auto name{type_name<T>()};
   cout
      << "\nusing T = " << name
      << "\nis_same_v<T, int>       = " << is_same_v<T, int>
      << "\nis_same_v<T, monostate> = " << is_same_v<T, monostate>
      << '\n';
};

int main() {
   using oint = variant<int, monostate>;
   oint zero{0};
   oint none{monostate{}};

   cout << boolalpha;

   cout << "visitor_nodecay\n";
   visit(visitor_nodecay, zero);
   visit(visitor_nodecay, none);

   cout << "\nvisitor_decay\n";
   visit(visitor_decay, zero);
   visit(visitor_decay, none);
}
