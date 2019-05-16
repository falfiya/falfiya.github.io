#include <stdio.h>
#include <string.h>

int main(int argc, char** argv) {
  printf("argc: %d\n", argc);
  for(register int i = 0; i < argc; i++) {
    printf("argv[%d] = %s\n", i, *(argv + i));
  }
}
