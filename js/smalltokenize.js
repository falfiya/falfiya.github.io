function* tokenize(src) {
   let cursor = 0;
   let lastToken = null;
   while (true) {
      if (cursor === src.length) {
         const input = yield lastToken;
         if (input === null) {
            
         }
      }
   }
}
