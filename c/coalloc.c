#include "./coalloc.h"
#ifdef __coalloc_debug_level__
#include <stdio.h>
#endif
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>

typedef unsigned short index;

/// The stack allocated heap
static uint8_t heap[__COALLOC_MAX_MEM__];

/// The first element of the heap
static uint8_t *start_ptr = heap;

/// The integer value of the first element on the heap
const uintptr_t start = (uintptr_t) heap;

/// Takes an `index idx` and returns a pointer to that region of `heap` memory
static inline void *idx_to_pointer(index idx) {
   return (void *) (start_ptr + idx);
}

/// Converts a `uintptr` to the index at which it resides in `heap`
/// Passing a pointer not included in `heap` leads to undefined behavior.
static inline index pointer_to_idx(uintptr_t ptr) {
   return ptr - start;
}

bool reserved[__COALLOC_MAX_MEM__];

/// Reserve or unreserve `size_t n` blocks of memory at `index idx`
static void set(index idx, size_t n, const bool val) {
   while (n --> 0) {
      #if __coalloc_debug_level__ == 1
      printf("set reserved[%hi] = %d\n", idx, val);
      #endif
      reserved[idx++] = val;
   }
}

void *coallocs(size_t bytes, COALLOC_ERROR* e) {
   index idx = 0;
   size_t c = 0;
   if (bytes == 0) {
      *e = E_COALLOC_ALLOC_IS_ZERO;
      return NULL;
   }
   while (idx < __COALLOC_MAX_MEM__) {
      if (reserved[idx]) {
         #if __coalloc_debug_level__ == 1
         printf("reserved[%hi] == true\n", idx);
         #endif
         c = 0;
      } else if (++c == bytes) {
         set(idx, bytes, true); // reserve it
         *e = E_COALLOC_OK;
         return idx_to_pointer(idx);
      }
      idx++;
   }
   *e = E_COALLOC_ALLOC_TOO_LARGE;
   return NULL;
}

void *coalloc(size_t bytes) {
   COALLOC_ERROR _; // ignore the error
   #ifdef __coalloc_debug_level__
   printf("coalloc(%4zu)", bytes);
   void *out = coallocs(bytes, &_);
   printf(" == %p\n", out);
   if (_) {
      printf("coalloc error == %s\n", COALLOC_ERROR_TO_STRING(_));
   }
   return out;
   #else
   return coallocs(bytes, &_);
   #endif
}

wptr coallocw(size_t size) {
   wptr wptr; // hahahaahaha this is valid. I love it
   wptr.ptr = coallocs(size, &wptr.e);
   if (wptr.ptr) {
      wptr.len = size;
   } else {
      wptr.len = 0;
   }
   return wptr;
}

COALLOC_ERROR coafree(void *ptr, size_t bytes) {
   if (bytes == 0) {
      return E_COALLOC_FREE_IS_ZERO;
   }
   if (bytes > __COALLOC_MAX_MEM__) {
      return E_COALLOC_FREE_TOO_LARGE;
   }
   uintptr_t uptr = (uintptr_t) ptr;
   if (uptr < start || uptr > start + __COALLOC_MAX_MEM__) {
      return E_COALLOC_INVALID_POINTER;
   }
   set(pointer_to_idx((uintptr_t) ptr), bytes, false);
   return E_COALLOC_OK;
}

COALLOC_ERROR coafreew(wptr wptr) {
   if (wptr.e) {
      return wptr.e;
   }
   return coafree(wptr.ptr, wptr.len);
}

// #define __coa_malloc_test__
#ifdef __coa_malloc_test__
#include <stdio.h>
int main() {
   for (unsigned i = 0; i < 20; ++i) {
      coalloc(i);
   }
   uintptr_t ten = (uintptr_t) &heap[10];
   printf("start: %lu, heap[10]: %lu, idx: %u\n", start, ten, pointer_to_idx(ten));
   for (unsigned i = 0; i < 20; ++i) {
      wptr wptr = coallocw(i);
      COALLOC_ERROR e = coafreew(wptr);
      #ifdef __coalloc_debug_level__
      printf(
         "coallocw(%2u) == wptr {\n"
         "   .e = %s, .len = 2%zu, .ptr = %p \n"
         "}\n",
         i,
         COALLOC_ERROR_TO_STRING(wptr.e),
         wptr.len,
         wptr.ptr
      );
      #endif
   }
}
#endif
