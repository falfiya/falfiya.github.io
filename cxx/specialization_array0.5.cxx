#include <string>
#include <iostream>
using namespace std;

template<int i> string hello;

template<> string hello<0> = "hello";
template<> string hello<1> = ", ";
template<> string hello<2> = "world";
template<> string hello<3> = "!";
template<> string hello<4> = "\n";

template<int i>
void loop() {
   if constexpr (i >= 0) {
      loop<i - 1>();
   }
   cout << hello<i>;
}

int main() {
   loop<4>();
}
