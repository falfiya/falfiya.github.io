#include <iostream>
using namespace std;


int main() {
  cout << "Double or nothing?\n";
  int num{};
  cin >> num;
  cout << "Hah, you got " << num * 4 << '\n';
  return 0;
}
