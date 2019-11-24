// This allocator sucks.
// Don't use it!
#ifndef __coalloc__
#define __coalloc__
#define __coalloc_debug_level__ 0
#define __COALLOC_MAX_MEM__ 0xFFFF
#include <stddef.h>

typedef enum COALLOC_ERROR {
   E_COALLOC_OK = 0, // I really wanted to name this E_COALLOK but that's dumb
   E_COALLOC_ALLOC_TOO_LARGE,
   E_COALLOC_ALLOC_IS_ZERO,
   E_COALLOC_FREE_TOO_LARGE,
   E_COALLOC_FREE_IS_ZERO,
   E_COALLOC_INVALID_POINTER,
} COALLOC_ERROR;

#define S(e) case E_COALLOC_ ## e: return "E_COALLOC_" # e
char *COALLOC_ERROR_TO_STRING(COALLOC_ERROR e) {
   switch(e) {
      S(OK);
      S(ALLOC_TOO_LARGE);
      S(ALLOC_IS_ZERO);
      S(FREE_TOO_LARGE);
      S(FREE_IS_ZERO);
      S(INVALID_POINTER);
      default: return "E_COALLOC_UNKNOWN";
   }
}

/// A wide pointer that holds the length of the allocated memory
typedef struct {
   size_t len;
   void *ptr;
   COALLOC_ERROR e;
} wptr;

/// coalloc but it's safe-ish.
// It still returns null but you can at least see why it failed.
void *coallocs(size_t, COALLOC_ERROR *);

/// Allocate some amount of bytes of memory on a heap stored on the stack.
/// It might return null if it can't find enough contiguous memory.
void *coalloc(size_t);

/// Like `coa_malloc` but returns a `wideptr` instead of a `void *`
/// so that you don't have to keep track of the length
wptr coallocw(size_t);

/// Frees a region of memory
/// Don't pass pointers that were not created by `coa_malloc`!
/// You WILL get undefined behavior
COALLOC_ERROR coafree(void *, size_t);

/// Frees a `wideptr`
/// See `coa_free`
COALLOC_ERROR coafreew(wptr);
#endif
