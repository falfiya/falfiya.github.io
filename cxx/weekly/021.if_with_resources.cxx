// great, now I can handle things like functions returning errors easily

#include <cstdio>
#include <algorithm>

int main(int argc, char *argv[]) {
   if (argc < 3) {
      if (auto err = printf("%s 5 cats", argv[0]); err < 0) {
         // can't even print lol
         return 2;
      }
      return 1;
   }

   if (auto err = printf("I have %s %s!", argv[1], argv[2]); err < 0) {
      return 2;
   }
}
