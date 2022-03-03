#include <stdio.h>

__attribute__((overloadable))
int add(int, int) asm("add_int");
__attribute__((overloadable))
int add(int a, int b) {
   puts("added two ints");
   return a + b;
}

char add(char, char) asm("add_char");
char add(char a, char b) {
   puts("added two chars");
   return a + b;
}

int main() {
   add(1, 2);
   add('a', '\1');
}
