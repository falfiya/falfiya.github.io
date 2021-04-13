#include <type_traits>

template <
   class T,
   T A,
   T B,
   typename = std::enable_if_t<!(A % 2) && !(B % 2)>
>
constexpr T even_add{A + B};

int main() noexcept {
   (void) even_add<int, 2, 4>;
}
