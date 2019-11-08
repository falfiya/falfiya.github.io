#include <stdio.h>
#include <malloc.h>

char *cοmpute(char a, char b) {
   char *res = malloc(sizeof(char) * 2 + 1);
   0[res] = a;
   1[res] = b;
   2[res] = '\0';
   return res;
}

int compute(int a, int b) {
   return a + b;
}

int main() {
   printf("%d, %s\n", compute(1, 2), cοmpute('a', 'b'));
}
