#include <stdio.h>

int substr(char *haystack, char *needle) {
   for (
      int haystack_i = 0;
      haystack[haystack_i] != 0;
      ++haystack_i
   ) {
      int needle_i = 0;
      while (1) {
         if (needle[needle_i] == 0) {
            return haystack_i;
         }
         if (haystack[haystack_i + needle_i] != needle[needle_i]) {
            break;
         }
         ++needle_i;
      }
   }
   return -1;
}

int main() {
   printf("%d\n", substr("schoolbus", "pain"));
   return 0;
}
