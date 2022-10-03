#ifdef _WIN32
#include <stdio.h>
#include <process.h>
#include <windows.h>

int main() {
   puts("Hello, World!");
   system("pause");
}
#else
#error "hello.c uses pause which is only known to exist on Windows"
#endif
