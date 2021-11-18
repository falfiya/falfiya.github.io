#include <new>
#include <utility>
#include <iterator>
using namespace std;

using byte_t = char;

template <class T, size_t len_t = 1>
struct ary {
   size_t len;
   T data[len_t];
   constexpr explicit ary() noexcept: len{len_t} {}
   constexpr explicit ary(size_t const len) noexcept: len{len} {}

   template <size_t i, size_t len, class ...Ts>
   static constexpr void init_array(T *array, T &&first, Ts &&...args) noexcept {
      array[i] = first;

      if constexpr (i + 1 < len) {
         init_array<i + 1, len>(array, forward<Ts>(args)...);
      }
   }

   template <class ...Ts, typename enable_if<sizeof...(Ts) == len_t, size_t>::type = 0>
   constexpr ary(Ts &&...rest) noexcept: len{len_t} {
      init_array<0, len_t>(this->data, forward<Ts>(rest)...);
   }

   static constexpr ary<T, len_t> *heap() noexcept {
      constexpr size_t bytes{sizeof(ary) + len_t * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) ary<T, len_t>();
   }

   static inline ary<T> *heap(size_t const len) noexcept {
      size_t const bytes{sizeof(ary) + len * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) ary<T>(len);
   }

   template <class ...Ts>
   static constexpr ary<T> *heap(Ts &&...rest) noexcept {
      constexpr size_t len{sizeof...(rest)};
      ary *const self{ary<T>::heap(len)};
      init_array<0, len>(self->data, forward<Ts>(rest)...);
      return self;
   }

   constexpr T *begin() noexcept { return this->data; }
   constexpr T *end() noexcept { return this->data + len; };
};

#include <iostream>

int main() {
   // would be nice if you didn't have to declare the size but whatever
   ary<int, 4> stack = {1, 2, 3, 4};
   auto *heap{ary<int>::heap(9, 10, 11, 3, 4)};
   auto *h{ary<int>::heap(3)};
   cout << heap->len << "\n";
}
