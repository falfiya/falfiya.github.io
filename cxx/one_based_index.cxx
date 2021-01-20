#include <iostream>
using namespace std;

template <class T>
void make_one_based(T *&ptr) {
   --ptr;
}

int main(int argc, char *argv[]) {
   make_one_based(argv);
   cout << "last argument: " << argv[argc] << '\n';
}
