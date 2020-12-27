#include <cstdint>
#include <stdint.h>
#include <tuple>
#include <cstdlib>
#include <iostream>
using namespace std;

using u = unsigned;

inline u rand_u() {
   int r = rand();
   return *reinterpret_cast<u *>(&r);
}

/// Contrived example, I know
inline tuple<u, u, u> rand_rect_prism() {
   return {rand_u(), rand_u(), rand_u()};
}

int main() {
   srand(time(nullptr));

   u width, height, depth;
   tie(width, height, depth) = rand_rect_prism();

   cout << ""
      "width  = " << width  << "\n"
      "height = " << height << "\n"
      "depth  = " << depth  << "\n"
   ;
}
