#include "stdio.h"
#ifdef _WIN32
#define offset 3
#else
#define offset 16
#endif

int main() {
   int nice = *((char *) main) - offset;
   printf("%d\n", nice);
}
