// goodbye, spatial locality!

#include <new>
#include <initializer_list>
#include <iterator>
using namespace std;

using byte_t = char;

template <class T>
struct node {
   static inline node<T> *make(size_t const len) noexcept {
      size_t const bytes{sizeof(node) + len * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) node(len);
   }

   static constexpr node<T> *make(initializer_list<T const> const il) noexcept {
      node *const self{make(il.size())};
      copy(il.begin(), il.end(), self->data);
   }

   /*
   Would really like homogeneous variadic function parameters:
   http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1219r2.html
   */
   template <size_t i, size_t len, class ...Ts>
   static constexpr void init_array(T *array, T const first, Ts const ...args) noexcept {
      array[i] = first;

      if constexpr (i + 1 < len) {
         init_array<i + 1, len>(array, args...);
      }
   }

   template <class ...Ts>
   static constexpr node<T> *make(Ts const ...rest) noexcept {
      constexpr size_t len{sizeof...(rest)};
      node *const self{make(len)};
      init_array<0, len>(self->data, rest...);
      return self;
   }

   size_t len;
   size_t last{};
   node *next{nullptr};
   T data[];

   constexpr explicit node(size_t const len) noexcept: len{len} {}

   constexpr T *begin() noexcept { return this->data; }
   constexpr T *end() noexcept { return this->data + len; };
};

#include <iostream>

struct box {
   int val;
   constexpr explicit box(int const val) noexcept: val{val} {
      this->print();
   }

   inline void print() noexcept {
      cout << "box(" << val << ")\n";
   }
};

int main() {
   auto boxes = node<box>::make(box{69}, box{29});
   for (auto current_box : *boxes) {
      current_box.print();
   }
   auto ints = node<int>::make(69, 420);
   for (auto current_int : *ints) {
      cout << current_int << '\n';
   }
}
