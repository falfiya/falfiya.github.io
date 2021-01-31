#include <iostream>
using namespace std;

class privaa {
   int a = 29;
public:
   int get_a() { return this->a; }
   void set_a(int a) { cout << "No!" << endl; }
};

struct stealer {
   int a;
};

int main() {
   privaa data;
   cout << "before stealer " << data.get_a() << '\n';
   stealer &stolen = *reinterpret_cast<stealer *>(&data);
   stolen.a = 42;
   cout << "after stealer " << data.get_a() << '\n';
}
