function stringSplit(needle, haystack)
   {if (needle.length === 0)
      {return []}
   else {
      const idx = haystack.indexOf(needle)
      if (idx === -1)
         {return [haystack]}
      else {
         const word = haystack.slice(0, idx);
         const rest = haystack.slice(idx + 1);
         return [...[word], ...(stringSplit(needle, rest))]}}}
