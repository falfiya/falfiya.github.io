// goodbye, spatial locality!

#include <initializer_list>
#include <iterator>
#include <iostream>
using namespace std;

template <class T>
struct node {
   size_t len;
   node *next;
   T *vals;

   constexpr explicit node(size_t len) noexcept: len{len}, vals{new T[len]} {};

   constexpr node(initializer_list<T> il) noexcept: len{il.size()}, vals{new T[len]} {
      copy(il.begin(), il.end(), this->vals);
   };

   constexpr T *begin() noexcept { return this->vals; };
   constexpr T *end() noexcept { return this->vals + len; };
   constexpr T const *begin() const noexcept { return this->vals; };
   constexpr T const *end() const noexcept { return this->vals + len; };
};

int main() {
   node<int> my_node = {1, 2, 3};
   for (auto e : my_node) {
      cout << e << endl;
   }
}
