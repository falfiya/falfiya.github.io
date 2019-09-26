// cc sizeof.c -o sizeof && ./sizeof; rm sizeof
#include "stdio.h"
#define s(t) , sizeof(t)

int main() {
   printf(
      "char      = %lu\n"
      "short     = %lu\n"
      "int       = %lu\n"
      "long      = %lu\n"
      "long long = %lu\n"
      "size_t    = %lu\n"
      s(char)
      s(short)
      s(int)
      s(long)
      s(long long)
      s(size_t)
   );
}
