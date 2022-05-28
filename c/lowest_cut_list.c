#include <stdio.h>

static size_t lowest_cut_list(size_t const *fst, size_t const *last) {
   while (1) {
      size_t const len = last - fst;
      printf("%zu[", len);
      for (size_t const *i = fst; i != last; i++) {
         printf("%zu, ", *i);
      }
      printf("]\n");
      fflush(stdout);
      size_t const *mid = fst + (len / 2);
      if (len == 0) {
         return *fst;
      }

      if (*fst < *last) {
         return *fst;
      }

      if (*fst > *mid) {
         printf("left\n");
         last = mid;
      } else {
         printf("right\n");
         fst = mid;
      }
   }
}

int main() {
   size_t ary[] = {2, 3, 4, 5, 6, 7, 8, 9, 0, 1};
   lowest_cut_list(ary, ary + 9);
}
