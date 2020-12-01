#include <iostream>

int a;

int &get_a() { return a; }

#define echo(code) std::cout << #code << "; //> " << (code) << '\n'

int main() {
   echo(get_a() = {});
   echo(get_a() = {39});
   echo(get_a());
   echo(a);
}
