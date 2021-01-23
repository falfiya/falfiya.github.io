#include <cstdint>

using u32 = uint32_t;

constexpr u32 pow(u32 base, u32 ex) noexcept {
   u32 res{base};
   while (ex --> 1) {
      res *= base;
   }
   return res;
}

constexpr u32 len(u32 v) noexcept {
   u32 ex{9};
   while (ex) {
      if (v >= pow(10, ex)) {
         return ex + 1;
      }
      ex--;
   }
   return 1;
}


constexpr u32 len_x99(u32 v) noexcept {
    return len(v * 99);
}

extern void keep(u32);
int main() {
   constexpr u32 thousand_lenth{len(99)};
   constexpr u32 other_length{len_x99(200)};
   keep(thousand_lenth);
}
