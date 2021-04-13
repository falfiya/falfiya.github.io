#include "stdio.h"

int main() {
   int ary[] = {0, 1, 2, 3, 4, 5, 6};
   printf("%d\n", ((size_t) ary)[ary]); // blursed
}
