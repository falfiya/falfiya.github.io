static inline size_t add_only_odd(size_t a, size_t b)
__attribute__((overloadable))
__attribute__((enable_if((a + b) % 2 == 1, "when the result is odd")))
{
   return a + b;
}

static inline size_t add_only_odd(size_t a, size_t b)
__attribute__((enable_if((a + b) % 2 == 0, "can be computed")))
__attribute__((unavailable("a + b is known to be odd!")));

int main() {
   add_only_odd(1, 2);
   size_t a = 2;
   add_only_odd(1, 1);
   add_only_odd(a, 2);
}
