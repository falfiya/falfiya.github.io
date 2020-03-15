#include <string>
#include <iostream>
using namespace std;

int main() {
   cout << "What's your favorite flavor of lemon?\n";
   string flavor{};
   getline(cin, flavor);
   cout << "Well, they don't come in " << flavor << " anymore.\nTry again.\n";
   return 0;
}
