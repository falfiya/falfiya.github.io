#include <iostream>
#include <string>
using namespace std;

inline void usage() {
   cerr << "chomp [line]\n";
   cerr << "If the line argument is absent, chomp takes input from stdin.\n";
}

int main(int argc, char** argv) {
   string line{};
   if (argc == 1) {
      // no arguments, take input from stdin
      getline(cin, line);
   } else if (argc == 2) {
      // our input is the argument
      line = *(argv + 1);
   } else {
      usage();
      return 1;
   }
   unsigned len = line.length();
   if (len == 0) {
      return 0;
   }
   if (line.back() == '\n') {
      line.pop_back();
      if (line.back() == '\r') {
         line.pop_back();
      }
   }
   cout << line;
}
