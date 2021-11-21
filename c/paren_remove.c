char *minRemoveToMakeValid(char *str) {
   char *buf = str;
   { // remove the right parens
      unsigned rremoved = 0;
      unsigned lparen_count = 0;
      while (1) {
         // c is the read head
         // buf is the write head
         char const c = buf[rremoved];
         if (c == '(') {
            lparen_count++;
            *buf++ = c;
            continue;
         }

         if (c == ')') {
            if (lparen_count != 0) {
               lparen_count--;
               *buf++ = c;
               continue;
            }

            // remove case: do not advance write head forwards
            rremoved++;
            continue;
         }

         *buf++ = c;
         if (__builtin_expect(c == '\0', 0)) {
            break;
         }
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

         if (*buf == ')') {
            rparen_count++;
            *c = *buf;
            continue;
         }

         if (*buf == '(') {
            if (rparen_count != 0) {
               rparen_count--;
               *c = *buf;
               continue;
            }

            // remove case: add one to lremoved
            lremoved++;
            continue;
         }

         *c = *buf;
      }
   }

   return str + lremoved;
}
