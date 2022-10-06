#include <stdio.h>
#include <string.h>
#include <windows.h>

int main(int argc, char **argv) {
   printf("CommandLineA: %s\n", GetCommandLineA());
   printf("argc: %d\n", argc);
   for (int i = 0; i < argc; i++) {
      printf("argv[%d] = %s\n", i, *(argv + i));
   }
}
