#include <string.h>
#include <stdlib.h>

/// Concats several strings
char* conkitten(char** strings) {
   #ifdef DEBUG
   puts("conkitten");
   #endif
   unsigned int len = 0;
   char** counter = strings;
   char* s;
   while ((s = *counter++) != 0) {
      #ifdef DEBUG
      printf("  %s\n", s);
      #endif
      len += strlen(s);
   }
   #ifdef DEBUG
   printf("  len = %d\n", len);
   #endif
   char *result = malloc(++len);
   *(result + len) = 0;
   #ifdef DEBUG
   printf("  %s\n", *strings);
   #endif
   strcpy(result, *strings++);
   while ((s = *strings++) != 0) {
      #ifdef DEBUG
      printf("  %s\n", s);
      #endif
      strcat(result, s);
   }
   return result;
}
