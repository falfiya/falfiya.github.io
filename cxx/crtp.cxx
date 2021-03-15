#include <iostream>
using namespace std;

template <class Child>
struct Base {
   inline void print_obj_count() {
      cout << Child::name << " has " << Child::obj_count << " objects\n";
   }
   inline Base() noexcept {
      cout << "Creating " << Child::name << '\n';
      Child::obj_count += 1;
      this->print_obj_count();
   };
   inline ~Base() noexcept {
      cout << "Deleting " << Child::name << '\n';
      Child::obj_count--;
      this->print_obj_count();
   };
};

struct Child final: public Base<Child> {
   static constexpr char const *name{"Child"};
   static size_t obj_count;
};
size_t Child::obj_count{};

int main() noexcept {
   Child temp0;
   Child temp1;
   Child temp2;
};
