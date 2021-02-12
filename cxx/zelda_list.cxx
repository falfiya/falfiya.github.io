// goodbye, spatial locality!

#include <new>
#include <initializer_list>
#include <utility>
#include <iterator>
using namespace std;

using byte_t = char;

template <class T>
struct node {
   static constexpr node<T> *make_one(T &&val) noexcept {
      size_t const bytes{sizeof(node) + sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      node *self{new(buffer) node()};
      self->data[0] = val;
      self->cursor = 1;
      return self;
   }

   static inline node<T> *make(size_t const len) noexcept {
      size_t const bytes{sizeof(node) + len * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) node(len);
   }

   static constexpr node<T> *make(initializer_list<T> const il) noexcept {
      node *const self{make(il.size())};
      copy(il.begin(), il.end(), self->data);
   }
   /*
   Would really like homogeneous variadic function parameters:
   http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1219r2.html
   */
   template <size_t i, size_t len, class ...Ts>
   static constexpr void init_array(T *array, T &&first, Ts &&...args) noexcept {
      array[i] = first;

      if constexpr (i + 1 < len) {
         init_array<i + 1, len>(array, forward<Ts>(args)...);
      }
   }

   template <class ...Ts>
   static constexpr node<T> *make(Ts &&...rest) noexcept {
      constexpr size_t len{sizeof...(rest)};
      node *const self{make(len)};
      init_array<0, len>(self->data, forward<Ts>(rest)...);
      return self;
   }

   size_t len;
   size_t cursor{};
   node *next{nullptr};
   T data[];

   constexpr explicit node() noexcept: len{1} {}
   constexpr explicit node(size_t const len) noexcept: len{len} {}

   inline node *push_back(T &&val) noexcept {
      if (cursor < len) {
         data[cursor++] = val;
         return this;
      }

      if (this->next == nullptr) {
         this->next = {node::make_one(forward<T>(val))};
         return this->next;
      }

      return this->next->push_back(forward<T>(val));
   }

   constexpr T *get(size_t const idx) noexcept {
      if (idx < this->len) {
         return this->data + idx;
      }

      if (this->next == nullptr) {
         return nullptr;
      }

      return this->next->get(idx - this->len);
   }

   constexpr T *begin() noexcept { return this->data; }
   constexpr T *end() noexcept { return this->data + len; };
};

#include <iostream>


int main() {
   auto ints{new node<int>()};
   ints->push_back(10);
   ints->push_back(20);
   ints->push_back(30);
   ints->push_back(40);
   ints->push_back(50);

   for (size_t i{}; i < 4; ++i) {
      int *int_ptr{ints->get(i)};
      if (int_ptr == nullptr) {
         cout << "ints[" << i << "] = nullptr\n";
      } else {
         cout << "ints[" << i << "] = " << *int_ptr << '\n';
      }
   }
}
