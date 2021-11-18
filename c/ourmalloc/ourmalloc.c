#pragma clang diagnostic ignored "-Wincompatible-pointer-types"
#pragma clang diagnostic ignored "-Wcompare-distinct-pointer-types"

#include <unistd.h>
#include "ourmalloc.h"

#define voidptr(ptr) ((void *) ptr)
#define header(ptr) ((header_t *) ptr)

inline header_t *next_header(header_t *prev_header) {
   return voidptr(prev_header + 1) + prev_header->size;
}

extern void *__heap_start;
extern void *__heap_end;

static header_t *heap_end;
static header_t *first_free_block;
inline u1_t inbounds(void *ptr) {
   return (__heap_start <= ptr) && (ptr < heap_end);
}

void init(void) {
   heap_end = first_free_block = __heap_start;
}

void *new(u63_t size) {
   if (size == 0) return 0;

   // round to nearest 8 bytes for alignment reasons
   size = ((size + 7 / 8)) * 8;

   if (size > u63_t_max) {
// bad
      return 0;
   }

   header_t *h = first_free_block;
   while(1) {
      if (h >= heap_end) break;

      if (!h->in_use && size <= h->size) {
         h->in_use = 1;
// good
         return h + 1;
      }

      h = next_header(h);
   }

   void *new_heap_end = voidptr(heap_end + 1) + size;
   if (new_heap_end > __heap_end) {
// bad
      return 0;
   }

   header_t *old_heap_end = heap_end;
   old_heap_end->size = 1;
   old_heap_end->in_use = 1;
   brk(heap_end = new_heap_end);

   if (first_free_block == old_heap_end) {
      first_free_block = new_heap_end;
   }
// good
   return old_heap_end + 1;
}

void delete(void *ptr) {
   if (!inbounds(ptr)) {
      return;
   }

   header_t *h = ptr - 1;
   h->in_use = 0;

   // if it's the last block, we can free some memory I guess
   if (next_header(h) == heap_end) {
      brk(heap_end = h);
   }

   if (ptr < first_free_block) {
      first_free_block = ptr;
   }
}

