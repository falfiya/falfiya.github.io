// https://leetcode.com/problems/find-pivot-index/description

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = nums => {
   let lsum = 0;
   let rsum = nums.reduce((a, v) => a + v, 0);
   let hold = 0;
   for (let i = 0; i < nums.length; i++) {
      const curr = nums[i];
      lsum += hold;
      rsum -= curr;
      hold = curr;
      if (lsum === rsum) {
         return i;
      }
   }
   return -1;
};
