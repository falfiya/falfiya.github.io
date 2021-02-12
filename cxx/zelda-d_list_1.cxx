// goodbye, spatial locality!

#include <initializer_list>
#include <iterator>
#include <iostream>
#include <new>
using namespace std;

using byte_t = char;

template <class T>
struct node {
   size_t len;
   node *next{nullptr};
   T data[];

   constexpr explicit node(size_t const len): len{len} {
      cout << "node(" << len << ")\n";
   };

   static inline node<T> *make(size_t const len) noexcept {
      size_t const bytes{sizeof(node) + len * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) node(len);
   }

   static constexpr node<T> *make(initializer_list<T const> const il) noexcept {
      node *const self{make(il.size())};
      copy(il.begin(), il.end(), self->data);
   }

   template <size_t i, size_t len, class Ts_first, class ...Ts>
   static constexpr void init_array(T *array, Ts_first const first, Ts const ...args) noexcept {
      array[i] = first;

      if constexpr (i + 1 < len) {
         init_array<i + 1, len>(array, args...);
      }
   }

   #ifndef __gnuc__
   template <class ...Ts>
   constexpr node(Ts const ...args): len{sizeof...(args)}, data{args...} {}

   template <class ...Ts>
   static constexpr node<T> *make(Ts const ...args) noexcept {
      constexpr size_t len{sizeof...(args)};
      node *const self{make(len)};
      init_array<0, len>(self->data, args...);
      return self;
   }
   #endif

   #ifdef old
   template <class ...Ts>
   static inline node<T> *make(Ts const ...args) noexcept {
      node *const self{make(sizeof...(args))};
      size_t offset{};
      size_t const _[]{(
         self->data[offset] = args,
         ++offset
      )...};
      (void) _;
      return self;
   }
   #endif

   #ifdef __gnuc__
   template <class ...Ts>
   static constexpr node<T> *make(Ts const ...args) noexcept {
      size_t const len{sizeof...(args)};
      size_t const bytes{sizeof(node) + len * sizeof(T)};
      byte_t *const buffer{new byte_t[bytes]};
      return new(buffer) node(args...);
   }
   #endif

   constexpr T *begin() noexcept { return this->data; };
   constexpr T *end() noexcept { return this->data + len; };
};

struct box {
   int val;
   box(int val): val{val} {
      cout << "box(" << val << ")\n";
   }
};

int main() {
   auto boxes = node<box>::make(box{69}, box{420});
   for (auto current_box : *boxes) {
      cout << current_box.val << '\n';
   }
   auto ints = node<int>::make(69, 420);
   for (auto current_int : *ints) {
      cout << current_int << '\n';
   }
}
