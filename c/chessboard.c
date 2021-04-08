#include <stdio.h>
#include <stdint.h>

inline void chess_board(size_t size) {
   size_t y = size;
   register uint8_t on = 0;
   while (y --> 0) {
      register size_t x = size;
      while (x --> 0) {
         fwrite("W B " + (on ^= 2), sizeof(char), 2, stdout);
      }
      on ^= 2;
      fputc('\n', stdout);
   }
}


int main() {
   size_t size;
   #define prompt "Enter the size of the chessboard\n> "
   fwrite(prompt, sizeof(char), sizeof(prompt), stdout);
   scanf("%zu", &size);
   chess_board(size);
}
