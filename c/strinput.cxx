#include <iostream>

int main() {
   std::cout << "What's your favorite flavor of lemon?\n";
   std::string flavor{};
   std::getline(std::cin, flavor);
   std::cout << "\x1B[AWell, they don't come in " << flavor << " anymore.\nTry again.\n";
   return 0;
}
