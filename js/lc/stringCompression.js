// https://leetcode.com/problems/string-compression/?envType=study-plan-v2&envId=leetcode-75
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = chars => {
   let push_offset = 0;
   function push(n) {
      for (const c of `${n}`) {
         chars[push_offset] = c;
         push_offset++;
      }
   }
   let i = 0;
   while (i < chars.length) {
      const curr = chars[i];
      i++;
      let count = 1;
      while (i < chars.length) {
         const next = chars[i];
         if (next === curr) {
            i++;
            count++;
         } else {
            // don't increment i since it's not the same character
            break;
         }
      }
      push(curr);
      if (count > 1) {
         push(count);
      }
   }
   return push_offset;
};

