#include <iostream>
using namespace std;
#define string static constexpr const char *

// https://stackoverflow.com/a/257382
template <class T>
struct has_str {
   template <class U>
   static char _has_str(decltype(&U::str));
   template <class U>
   static short _has_str(...);
   enum {
      value = sizeof(_has_str<T>(0)) == sizeof(char)
   };
};

template<int i = 0> struct greeting {};

template<> struct greeting<0> { string str{"Hello"}; };
template<> struct greeting<1> { string str{", "}; };
template<> struct greeting<2> { string str{"world"}; };
template<> struct greeting<3> { string str{"!\n"}; };

template <int i = 0>
void loop() {
   if constexpr (has_str<greeting<i>>::value) {
      cout << greeting<i>::str;
      loop<i + 1>();
   }
}

int main() {
   loop();
}
