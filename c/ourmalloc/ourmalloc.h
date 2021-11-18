#pragma once
#ifdef _WIN32
#error "linux only"
#endif

typedef _Bool u1_t;
typedef unsigned char u8_t;
typedef unsigned long u63_t;
typedef unsigned long u64_t;

#define u63_t_max (1lu << 63)

/* header_t

00 00 00 00 00 00 00 08 XX XX XX XX XX XX XX XX [header_t]
^^ header_t *h          ^^ h + 1                ^^ next_header(h)

XX marks memory that the caller will be using
*/
typedef struct header {
   u63_t size: 63;
   u1_t in_use: 1;
} header_t;

void *new(u63_t size)
   __attribute__(
      (diagnose_if(size > u63_t_max,
         "size exceeds u63_t_max!", "error")));
void *new(u63_t);
void delete(void *);
