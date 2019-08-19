#ifdef __coa_malloc_debug__
#include <stdio.h>
#endif
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include "./coa_malloc.h"

#define max_mem 0xFFFF
#define byte_size 8
typedef unsigned char byte;
typedef unsigned short index;
typedef unsigned long long ull;

/// The stack allocated heap
const byte heap[max_mem];

/// The first element of the heap
const byte const *start_ptr = &heap[0];

/// The integer value of the first element on the heap
const uintptr_t start = (uintptr_t) &heap[0];

bool reserved[max_mem];

/// Reserve or unreserve `size_t n` blocks of memory at `index idx`
void set(index idx, size_t n, const bool val) {
   while (n --> 0) {
      #ifdef __coa_malloc_debug__
      printf("reserved[%hi] = %hi\n", idx, val);
      #endif
      reserved[idx++] = val;
   }
}

/// Returns the number of bytes needed from the `size_t` allocation size
size_t bytes_needed(size_t size) {
   return (size + byte_size - 1) / byte_size;
}

/// Takes an `index idx` and returns a pointer to that region of `heap` memoryf
void *idx_to_pointer(index idx) {
   return (void *) (start_ptr + idx);
}

void *coa_malloc(size_t size) {
   size_t b = bytes_needed(size);
   #ifdef __coa_malloc_debug__
   printf("size_t: %2lu, bytes_needed: %lu\n", size, b);
   #endif
   index idx = 0;
   size_t c = 0;
   while (idx < max_mem) {
      if (reserved[idx]) {
         #ifdef __coa_malloc_debug__
         printf("reserved[%hi] == true\n", idx);
         #endif
         c = 0;
      } else if (++c == b) {
         set(idx, b, true); // reserve it
         return idx_to_pointer(idx);
      }
      idx++;
   }
   #ifdef __coa_malloc_debug__
   puts("__coa_malloc__: failed to allocate memory");
   #endif
   return NULL;
}

/// Converts a `uintptr` to the index at which it resides in `heap`
/// Passing a pointer not included in `heap` leads to undefined behavior.
index pointer_to_idx(uintptr_t ptr) {
   return ptr - start;
}

wideptr coa_mallocw(size_t size) {
   wideptr wptr;
   wptr.ptr = coa_malloc(size);
   if (wptr.ptr) {
      wptr.len = size;
   } else {
      wptr.len = 0;
   }
   return wptr;
}

void coa_free(void *ptr, size_t size) {
   size_t b = bytes_needed(size);
   set(pointer_to_idx((uintptr_t) ptr), b, false);
}

void coa_freew(wideptr wptr) {
   coa_free(wptr.ptr, wptr.len);
}

#ifdef __coa_malloc_test__
int main() {
   for (unsigned i = 0; i < 20; ++i) {
      printf("__coa_malloc__(%2u) == %8lu   \n", i, (uintptr_t) coa_malloc(i));
   }
   uintptr_t ten = (uintptr_t) &heap[10];
   printf("start: %lu, heap[10]: %lu, idx: %u\n", start, ten, pointer_to_idx(ten));
}
#endif
