#include <type_traits>
#include <iostream>
using namespace std;

template <class T, typename = enable_if_t<sizeof(T) == sizeof(void *)>>
struct rcx {
   static constexpr rcx<T> *make(T val) {
      return *reinterpret_cast<rcx<T> **>(&val);
   }

   constexpr T self() const noexcept {
      auto self{this};
      return *reinterpret_cast<T *>(&self);
   }

   constexpr void print() const noexcept {
      cout << this->self() << '\n';
   }
};

struct two_ints {
   int a;
   int b;
};

ostream &operator<<(ostream &os, two_ints const &ti) {
   os << "two_ints {" << ti.a << ", " << ti.b << "}\n";
   return os;
};

int main() noexcept {
   two_ints c{1, 2};
   auto my_int{rcx<two_ints>::make(c)};
   my_int->print();
}
