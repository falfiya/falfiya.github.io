#include <iostream>
using lint = long long int;
using namespace std;

lint a(0);
lint b(1);
lint c;

inline void put(lint i) {
  cout << i << ' ';
}

int main(int argc, char *argv[]) {
  int count(stoi(argv[1]));
  if (count > 0) {
    put(0);
    if (count > 1) {
      put(1);
      count -= 2;
      while (count --> 0) {
        c = a + b;
        a = b;
        b = c;
        put(c);
      }
    }
  }
  cout << '\n';
  return 0;
}
