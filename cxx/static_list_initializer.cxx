#include <iostream>

template <class T, class ...Ts>
constexpr void init(Ts ...args) noexcept {
   T ary[] = {args...};
   for (auto elem : ary) {
      std::cout << elem << '\n';
   }
}

int main() {
   init<int>(1, 2, 3);
}
