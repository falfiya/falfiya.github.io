#include <functional>
#include <iostream>
using namespace std;

struct Cargo {
   virtual size_t max_weight() const noexcept = 0;
};

struct U_Haul final: public Cargo {
   virtual size_t max_weight() const noexcept override final {
      return 666;
   };
};

int main() noexcept {
   cout << __invoke(&U_Haul::max_weight, (U_Haul *) &main) << '\n';
}
