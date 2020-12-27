#include <iostream>
using namespace std;

template <class T>
class Store {
   T val;
   mutable char const *status = nullptr;
public:
   constexpr Store(T val) noexcept: val(val) {};

   constexpr T get_leave_status(char const *status) const noexcept {
      // able to mutate even though method is declared const
      this->status = status;
      return this->val;
   }

   constexpr char const *get_status() const noexcept {
      return this->status;
   }
};

int main() {
   constexpr Store store{0b100101};
   cout << ""
      "store.val    = " << store.get_leave_status(__FILE__) << "\n"
      "store.status = " << store.get_status() << "\n"
   ;
}
