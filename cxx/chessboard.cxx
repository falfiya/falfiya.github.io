#include <cstdint>
#include <iostream>

using namespace std;

inline void chess_board(size_t size) noexcept {
   size_t y{size};
   uint8_t on{0};
   while (y --> 0) {
      size_t x{size};
      while (x --> 0) {
         cout << "W \0B \0" + (on ^= 3);
      }
      on ^= 3;
      cout << '\n';
   }
}


int main() noexcept {
   size_t number;
   cout << "Enter a number representing chessboard size: ";
   cin >> number;
   chess_board(number);
}
