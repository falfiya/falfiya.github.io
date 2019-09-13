#include <iostream>
#include <string>
#include <cmath>
#include <vector>
typedef unsigned uint;
using namespace std;

class rtriangle {
   public:
   uint a;
   uint b;
   float c;
   void print() {
      cout << a << ", " << b << ", " << c << endl;
   }
};

typedef ::vector<rtriangle *> tv;

tv right(long hyp) {
   tv out{};
   for (uint a = 1; a <= hyp; ++a) {
      for (uint b = 1; b <= hyp; ++b) {
         float c = sqrt(a * a + b * b);
         if (c <= hyp) {
            out.push_back(new rtriangle {a, b, c});
         }
      }
   }
   return out;
}

int main(int argc, char **argv) {
   if (argc != 2) {
      cout << "You must provide only one argument to " << *argv << endl;
      cout << *argv << " hyp\n";
      return 1;
   }
   tv out = right(stol(*++argv));
   for (rtriangle* t : out) {
      t->print();
   }
}
