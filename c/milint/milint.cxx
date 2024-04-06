#include <sstream>
#include <time.h>
#include <stdlib.h>
#include <iostream>

int main() {
   srand(time(NULL));   // Initialization, should only be called once.
   std::stringstream ss;
   for (int i = 0; i < 1000000; i++) {
      ss << rand();
   }
   std::cout << ss.str();
}
