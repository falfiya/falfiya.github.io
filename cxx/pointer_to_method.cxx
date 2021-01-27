#include <iostream>

class Box {
   int data{};
public:
   constexpr int get_data() const { return this->data; };
   inline void set_data(int data) { this->data = data; };
};

template <class Class, class Consumed, class Returned>
using method = void (Class::*)(Consumed);

static method<Box, int, void> set_data_pointer{&Box::set_data};

int main() {
   Box b;
   (b.*set_data_pointer)(42);
   std::cout << b.get_data() << std::endl;
}
