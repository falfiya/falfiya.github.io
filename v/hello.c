#include <stdio.h>

static char* areas[] = {
   "game",
   "web",
   "tools",
   "science",
   "systems",
   "GUI",
   "mobile"
};

int main(void) {
   for (unsigned short i = 0; i < sizeof(areas) / sizeof(char *); ++i) {
      printf("Hello, %s developers!\n", areas[i]);
   }
}
