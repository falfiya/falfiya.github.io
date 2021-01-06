#include "stdio.h"

int main(int argc, char *argv[]) {
   if (argc != 2) {
      fprintf(stderr, "%s file_to_print.txt\n", *argv);
      return 1;
   }

   FILE *f = fopen(argv[1], "r");

   fseek(f, 0, SEEK_END);
   long long fsize = ftell(f);
   fseek(f, 0, SEEK_SET);

   fread(&argc, 1, fsize, f);
   // fclose(f);

   puts(&argc);
}
