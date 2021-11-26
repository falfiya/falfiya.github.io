// 0ms :Cults:

char *minRemoveToMakeValid(char *str) {
   char *buf = str;
   { // remove the right parens
      unsigned rremoved = 0;
      unsigned lparen_count = 0;
      while (1) {
         // c is the read head
         // buf is the write head
         char const c = buf[rremoved];
         switch (c) {
         case '(':
            lparen_count++;
            break;
         case ')':
            if (lparen_count == 0) {
               rremoved++;
               continue;
            }
            lparen_count--;
            break;
         }

         *buf++ = c;
         if (__builtin_expect(c == '\0', 0)) break;
      }
   }
   // buf is currently on the null byte
   unsigned lremoved = 0;
   {
      unsigned rparen_count = 0;
      while (buf --> str) {
         // buf is the read head
         // c is the write head
         char *const c = buf + lremoved;

         switch (*buf) {
         case ')':
            rparen_count++;
            break;
         case '(':
            if (rparen_count == 0) {
               lremoved++;
               continue;
            }
            rparen_count--;
            break;
         }

         *c = *buf;
      }
   }

   return str + lremoved;
}
