// https://leetcode.com/problems/increasing-triplet-subsequence
/**
 * @param {number[]} ary
 * @return {boolean}
 */
var increasingTriplet = ary => {
   let first = Infinity;
   let second = Infinity;
   for (const current of ary) {
      if (second < current) {
         return true;
      }

      if (first < current) {
         second = current;
      } else {
         first = current;
      }
   }
   return false;
};

increasingTriplet([2,1,5,0,4,6]);
