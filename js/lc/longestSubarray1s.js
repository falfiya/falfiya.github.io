// https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = nums => {
   let max = 0;
   let prev = 0;
   let curr = 0;
   let zeroSeen = false;
   for (const n of nums) {
      if (n === 1) {
         curr++;
      }
      if (n === 0) {
         zeroSeen = true;
         prev = curr;
         curr = 0;
      }
      const joined = prev + curr;
      if (joined > max) {
         max = joined;
      }
   }
   if (zeroSeen) {
      return max;
   } else {
      // you have to delete 1 element
      return max - 1;
   }
};
