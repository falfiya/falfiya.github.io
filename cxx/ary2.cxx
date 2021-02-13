#include <new>
#include <utility>
#include <iterator>
using namespace std;

using byte_t = char;

template <class ...Ts>
struct decay_common_type {
   using type = typename decay<typename common_type<Ts ...>::type>::type;
};

template <class T, size_t len_t = 0>
struct ary {
   size_t length{len_t};
   T data[len_t];
   constexpr explicit ary() noexcept = default;

   template <size_t i = 0>
   constexpr void init(T const (&other)[len_t]) noexcept {
      this->data[i] = other[i];
      if constexpr (i + 1 < len_t) {
         init<i + 1>(other);
      }
   }

   constexpr ary(T const (&other)[len_t]) noexcept {
      init(other);
   };

   template <
      class ...Ts,
      typename AllTs = typename decay_common_type<Ts ...>::type,
      typename enable_if<(is_convertible_v<Ts, T> && ...), size_t>::type = 0,
      typename enable_if<sizeof...(Ts) == len_t, size_t>::type = 0
   >
   constexpr ary(Ts &&...vals) noexcept: length{len_t}, data{static_cast<T>(vals)...} {}

   /// Don't use this!
   constexpr explicit ary(size_t const len) noexcept: length{len} {}

   template <
      class ...Ts,
      typename AllTs = typename decay_common_type<Ts ...>::type,
      typename enable_if<(is_convertible_v<Ts, T> && ...), size_t>::type = 0
   >
   static inline ary<T, sizeof...(Ts)> *make(Ts &&...vals)
   {
      return new ary<T, sizeof...(Ts)>(forward<Ts>(vals)...);
   }

   static inline ary<T> *dyn(size_t const len) {
      using byte_t = char;
      size_t const bytes{sizeof(ary) + len * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) ary<T>(len);
   }

   constexpr T *begin() noexcept { return this->data; }
   constexpr T *end() noexcept { return this->data + length; }
};

#include <iostream>

int main() {
   ary<float, 5> stack = {1, 2, 3, 4, 5};
   cout << "ary<?, " << stack.length << ">\n";
   for (auto &&e : stack) {
      cout << e << '\n';
   }
   cout << '\n';

   // <>::
   auto heap{ary<int>::make(1, 2, 3, 4, 5, 6, 7, 8, 91323)};
   cout << "ary<?, " << heap->length << ">\n";
   for (auto &&e : *heap) {
      cout << e << '\n';
   }
   cout << '\n';

   // <>::     <>::
   //  <>::  <>:: <>::
   auto *dyn_heap{ary<double>::dyn(7)};
   dyn_heap->data[0] = 9;
   dyn_heap->data[1] = 8;
   dyn_heap->data[2] = 2;
   dyn_heap->data[6] = 3;

   cout << "ary<?, " << dyn_heap->length << ">\n";
   for (auto &&e : *dyn_heap) {
      cout << e << '\n';
   }
}
