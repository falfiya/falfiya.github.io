// the best way to declare arrays
#include <string>
#include <iostream>
using namespace std;

template<int i> string hello;

template<> string hello<0> = "hello";
template<> string hello<1> = ", ";
template<> string hello<2> = "world";
template<> string hello<3> = "!";
template<> string hello<4> = "\n";

template<int i, int max>
void printer() {
   if constexpr (i <= max) {
      cout << hello<i>;
      printer<i + 1, max>();
   }
}

int main() {
   printer<0, 4>();
}
