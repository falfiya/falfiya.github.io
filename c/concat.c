char *concat(char const* const restrict s0, char const* const restrict s1, size_t *const restrict len_out) {
   size_t i = 0;
   for (char const *restrict p = s0; *p; p++, i++);
   for (char const *restrict p = s1; *p; p++, i++);
   char *const out = malloc(i + 1);

   out[i] = '\0';

   *len_out = i;
   i = 0;

   for (char const *restrict p = s0; *p; p++, i++) out[i] = *p;
   for (char const *restrict p = s1; *p; p++, i++) out[i] = *p;
   return out;
}
