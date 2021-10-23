#include <type_traits>
using namespace std;

template <typename Base, typename Derived>
using extends = enable_if_t<is_base_of_v<Base, Derived>>;

struct cat{};
struct dog{};

template <typename T, typename = extends<cat, T>>
void only_cats(T) noexcept;

int main() noexcept {
   only_cats(cat{});
   only_dogs(dog{});
}
