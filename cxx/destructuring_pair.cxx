#include <cstdlib>
#include <iostream>
#include <system_error>
#include <utility>
using namespace std;

#define nil nullptr

inline pair<int, char const *> even_random_int() noexcept {
   int val = rand();
   if (val % 2) {
      return {0, "rand() was odd!"};
   } else {
      return {val, nil};
   }
}

inline void display_even_random_int() noexcept {
   auto [rand0, err] = even_random_int();

   if (err != nil) {
      cout << err << '\n';
      return;
   }

   cout << rand0 << '\n';
}

int main() {
   srand(time(nil));

   int i = 10;
   while (i --> 0) {
      display_even_random_int();
   }
}
