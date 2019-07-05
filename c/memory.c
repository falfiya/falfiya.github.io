#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
// #define DEBUG

#define max_mem 0xFFFF
#define byte_size 8
typedef unsigned char byte;
typedef unsigned short index;
typedef unsigned long long ull;

const byte heap[max_mem];
const byte* start_ptr = &heap[0];
const uintptr_t start = (uintptr_t) &heap[0];
bool reserved[max_mem];

typedef struct {
   size_t len;
   void* ptr;
} wideptr;

void set(index idx, size_t n, const bool val) {
   while (n --> 0) {
      #ifdef DEBUG
      printf("reserved[%hi] = %hi\n", idx, val);
      #endif
      reserved[idx++] = val;
   }
}

size_t bytes_needed(size_t size) {
   return (size + byte_size - 1) / byte_size;
}


void* idx_to_pointer(index idx) {
   return (void*) (start_ptr + idx);
}

void* ft_malloc(size_t size) {
   size_t b = bytes_needed(size);
   #ifdef DEBUG
   printf("size_t: %2lu, bytes_needed: %lu\n", size, b);
   #endif
   index idx = 0;
   size_t c = 0;
   while (idx < max_mem) {
      if (reserved[idx]) {
         #ifdef DEBUG
         printf("reserved[%hi] == true\n", idx);
         #endif
         c = 0;
      } else if (++c == b) {
         set(idx, b, true); // reserve it
         return idx_to_pointer(idx);
      }
      idx++;
   }
   puts("failed!");
   return NULL;
}

index pointer_to_idx(uintptr_t ptr) {
   return ptr - start;
}

wideptr ft_mallocw(size_t size) {
   wideptr wptr;
   wptr.ptr = ft_malloc(size);
   if (wptr.ptr) {
      wptr.len = size;
   } else {
      wptr.len = 0;
   }
}

void ft_free(void* ptr, size_t size) {
   size_t b = bytes_needed(size);
   set(pointer_to_idx((uintptr_t) ptr), b, false);
}

void ft_freew(wideptr wptr) {
   ft_free(wptr.ptr, wptr.len);
}

int main() {
   for (unsigned i = 0; i < 20; ++i) {
      printf("ft_malloc(%2u) == %8lu   \n", i, (uintptr_t) ft_malloc(i));
   }
   uintptr_t ten = (uintptr_t) &heap[10];
   printf("start: %lu, heap[10]: %lu, idx: %u\n", start, ten, pointer_to_idx(ten));
}
