#include <iostream>
#include <iomanip>
#define TABLE_SIZE 12
using namespace std;

auto main() -> int {
   for (unsigned a(1); a <= TABLE_SIZE; ++a) {
      for (unsigned b(1); b <= TABLE_SIZE; ++b) {
         cout << setw(4);
         cout << a * b;
      }
      cout << endl;
   }
}
