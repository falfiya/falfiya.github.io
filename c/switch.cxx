/// Okay so one of my friends had this assignment where he was supposed to use
/// switch instead of < and > and that's stupid so naturally I wanted to try it.
/// There was some source code he was supposed to translate into switch.
/// My godawful code has the same behavior as the original, I think. Whatever.

#include <iostream>
using namespace std;

#define c(n) case n:
#define C(n, e) case n: { cout << e << endl; break; }
auto main() -> int {
   unsigned age = 0;
   cout << "Enter age to see ticket price: ";
   cin >> age;
   switch(age) {
      c(0)
      c(1)
      c(2)
      c(3)
      c(4)
      C(5, "$0.00" << endl)
      c(6)
      c(7)
      c(8)
      c(9)
      c(10)
      c(11)
      C(12, "$10.00")
      c(13)
      c(14)
      c(15)
      c(16)
      c(17)
      c(18)
      c(19)
      c(20)
      c(21)
      c(22)
      c(23)
      c(24)
      c(25)
      C(26, "$18.00")
      default: cout << "$15.00" << endl;
   }
   #ifdef _WIN32
   system("pause");
   #endif
   return 0;
}
