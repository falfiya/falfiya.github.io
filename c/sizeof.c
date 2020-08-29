// cc sizeof.c -o sizeof && ./sizeof; rm sizeof
#include <stdint.h>
#include <stdio.h>

#define s(t) , sizeof(t)

int main() {
   printf(
      "char        = %llu\n"
      "short       = %llu\n"
      "int         = %llu\n"
      "long        = %llu\n"
      "long long   = %llu\n"
      "size_t      = %llu\n"
      "long double = %llu\n"
      "uintptr_t   = %llu\n"
      s(char)
      s(short)
      s(int)
      s(long)
      s(long long)
      s(size_t)
      s(long double)
      s(uintptr_t)
   );
}
