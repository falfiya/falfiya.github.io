#include <iostream>

int main() {
  std::cout << "Double or nothing?\n";
  int num{};
  std::cin >> num;
  std::cout << "Hah, you got " << num * 4 << '\n';
  return 0;
}
