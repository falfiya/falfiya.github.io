function parse_int(str) {
   const zero = '0'.charCodeAt(0);
   var out = 0;
   for (const char of str) {
      const c = char.charCodeAt(0) - zero;
      if (c < 0 || 9 < c) {
         return null;
      }

      out *= 10;
      out += c;
   }

   return out;
}
