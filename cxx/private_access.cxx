#include <iostream>
using namespace std;

class privaa {
   int a{29};
public:
   int get_a() {
      return this->a;
   }

   void set_a(int a) {
      this->a = {a};
   }
};

struct stealer {
   int a{};
   int get_a();
   void set_a(int a);
};

int main() {
   privaa data;

   cout << "before stealer " << data.get_a() << '\n';

   reinterpret_cast<stealer *>(&data)->a = 42;

   cout << "after stealer " << data.get_a() << '\n';
}
