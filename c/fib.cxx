#include <iostream>
using lint = unsigned long long int;
using namespace std;

lint a(0);
lint b(1);
lint c;

inline void put(lint i) {
  cout << i << ' ';
}

void print_usage() {
  cerr << "fib n\n  n: the number of numbers you want to generate\n";
  exit(1);
}

int main(int argc, char *argv[]) {
  if (argc != 2) {
    print_usage();
  }
  int count;
  try {
    count = stoi(argv[1]);
  } catch (exception e) {
    print_usage();
  }
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
