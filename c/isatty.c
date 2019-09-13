#include <stdio.h>
#ifdef _WIN32
#include <io.h>
#define isatty _isatty
#define fileno _fileno
#else
#include <unistd.h>
#endif
#define tty(s) printf("%-10s %s\n", # s, isatty(fileno(s)) ? "yes" : "no")

int main() {
   tty(stdin);
   tty(stdout);
   tty(stderr);
}
