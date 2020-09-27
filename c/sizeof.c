// cc sizeof.c -o sizeof && ./sizeof; rm sizeof
#include <stdint.h>
#include <stdio.h>

#define s(t) , sizeof(t)
#define arch , sizeof(void *) == 8 ? "_64" : ""

int main() {
   printf(
      "Arch        = x86%s\n"
      "\n"
      "char        = %zu\n"
      "short       = %zu\n"
      "int         = %zu\n"
      "unsigned    = %zu\n"
      "long        = %zu\n"
      "long long   = %zu\n"
      "\n"
      "float       = %zu\n"
      "double      = %zu\n"
      "long double = %zu\n"
      "\n"
      "size_t      = %zu\n"
      "uintptr_t   = %zu\n"
      arch

      s(char)
      s(short)
      s(int)
      s(unsigned)
      s(long)
      s(long long)

      s(float)
      s(double)
      s(long double)

      s(size_t)
      s(uintptr_t)
   );
}
