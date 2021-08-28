#include <iostream>
#include <typeinfo>
using namespace std;

template<typename T>
class list{};

template<typename T, typename container_t = list<T>>
struct Clazz {
   static void print() {
      cout
         << "non-specialized Clazz["
         << typeid(T).name() << ", "
         << typeid(container_t).name() << "]\n";
   }
};
template<typename container_t>
struct Clazz<int, container_t> {
   static void print() {
      cout
         << "specialized Clazz["
         << typeid(int).name() << ", "
         << typeid(container_t).name() << "]\n";
   }
};

int main() noexcept {
   Clazz<char>::print();
   Clazz<int>::print();
}
