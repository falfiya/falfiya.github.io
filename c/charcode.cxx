#include <iostream>

int main() {
  std::cout << "Type a character\n";
  char c(0);
  std::cin >> c;
  std::cout << static_cast<int>(c) << '\n';
}
