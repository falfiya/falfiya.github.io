#include <iostream>
#include <type_traits>

struct above_me {
   size_t dummy;
   // why is this a thing
   constexpr void *operator&() const noexcept {
      return (char *) this + sizeof(above_me);
   }
};

int main() noexcept {
   size_t const volatile five{5};
   above_me above_me{};
   auto const above_me_ptr{(std::remove_cv_t<decltype(five)> *) &above_me};
   *above_me_ptr = 4;
   std::cout << "five is " << five << '\n';
   std::cout.sync_with_stdio()
}
