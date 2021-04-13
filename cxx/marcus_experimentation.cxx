#include <iostream>
#include <type_traits>
using namespace std;

struct printer {
   void print() const noexcept {
      cout << "suffering";
   }
};

// non pointer print
template <class T>
void print(T t) noexcept {
   t.print();
}

// foo **
template <class T>
constexpr void print(T *t) noexcept {
   print(*t);
}

int main() noexcept {
   printer a;
   auto b{&a};
   auto c{&b};
   auto d{&c};
   print(d);
}

