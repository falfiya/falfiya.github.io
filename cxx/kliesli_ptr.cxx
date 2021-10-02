#include <iostream>
#include <functional>

template <typename f>
using fn = std::function<f>;

template <typename a, typename b, typename c>
inline fn<c *(a)> compose(fn<b *(a)> const fnA, fn<c *(b)> const fnB) noexcept {
   return [fnA, fnB](a input){
      auto res{fnA(input)};
      if (res == nullptr) {
         return res;
      } else {
         return fnB(*res);
      }
   };
}

inline int *negate(int a) noexcept {
   int *const res = new int;
   *res = -a;
   return res;
}

int main() noexcept {
   auto const double_negate = compose<int, int, int>(negate, negate);
   std::cout << *double_negate(5) << '\n';
}
