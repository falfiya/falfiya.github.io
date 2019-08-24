#ifdef __unix
#include <unistd.h>

int main() {
   do {
      write(1, "n\n", 2);
   } while (1);
}
#else
#error "Only platforms with unistd.h can be used"
#endif
