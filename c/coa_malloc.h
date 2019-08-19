#ifndef __coa_malloc__
#define __coa_malloc__

// #define __coa_malloc_debug__
#include <stdlib.h>

/// A wide pointer that holds the length of the allocated memory
typedef struct {
   size_t len;
   void* ptr;
} wideptr;

/// Allocate memory on a heap stored on the stack.
/// It might return null if it can't find enough contiguous memory.
/// It's cursed
void *coa_malloc(size_t);

/// Like `coa_malloc` but returns a `wideptr` instead of a `void *`
/// so that you don't have to keep track of the length
wideptr coa_mallocw(size_t);

/// Frees a region of memory
/// Don't pass pointers that were not created by `coa_malloc`!
/// You WILL get undefined behavior
void coa_free(void *, size_t);

/// Frees a `wideptr`
/// See `coa_free`
void coa_freew(wideptr wptr) {
   coa_free(wptr.ptr, wptr.len);
}
#endif
