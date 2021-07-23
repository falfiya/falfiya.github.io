#include <iostream>
using namespace std;

template <typename T>
struct span {
   static constexpr size_t bottom48bits{(1ull << 48ull) - 1ull};
   size_t bitfield;

   constexpr explicit span(size_t const size, T *const ptr) noexcept {
      if (reinterpret_cast<size_t>(ptr) >> 48ull) {
         __builtin_trap();
      } else {
         this->bitfield = reinterpret_cast<size_t>(ptr) & bottom48bits;
      }

      constexpr size_t u16_max{(1ull << 16ull) - 1ull};
      if (size > u16_max) {
         __builtin_trap();
      } else {
         this->bitfield |= size << 48ull;
      }
   }

   constexpr size_t size() const noexcept {
      return this->bitfield >> 48ull;
   }

   constexpr T* ptr() const noexcept {
      return reinterpret_cast<T *>(this->bitfield & bottom48bits);
   }

   constexpr T& operator[](size_t const idx) const noexcept {
      if (idx > this->size()) {
         __builtin_trap();
      } else {
         return this->ptr()[idx];
      }
   }
};

char buf[50] = "Hello, World!";

int main() noexcept {
   span hello_world{13, buf};

   cout << "sizeof(span) = " << sizeof(hello_world) << '\n';
   cout << hello_world.ptr() << '\n';

   hello_world[12] = '?';
   cout << hello_world.ptr() << '\n';
}
