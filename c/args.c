#include <stdio.h>
#include <string.h>
#include <windows.h>
#include <winuser.h>

#pragma comment(lib, "user32")

int main(int argc, char **argv) {
   printf("CommandLineA: %s\n", GetCommandLineA());
   printf("argc: %d\n", argc);
   for (int i = 0; i < argc; i++) {
      char *title = malloc(99);
      sprintf(title, "argv[%d]", i);
      printf("argv[%d] = %s\n", i, *(argv + i));
      MessageBox(NULL, *(argv + i), title, 0);
      free(title);
   }
}
