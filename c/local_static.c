#include <stdio.h>
#include <windows.h>

int increment() {
   static int i = 0;
   return i++;
}

int main() {
   while (1) {
      printf("increment() -> %i\n", increment());
      Sleep(500);
   }
}
