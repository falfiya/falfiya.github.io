// https://leetcode.com/problems/max-consecutive-ones-iii/description
// Bridged by a lightwave...

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const longestOnes = (nums, k) => {
   const bridged = [];
   let head = 0;
   let max = 0;

   let currentRun = 0;
   let workingK = k;
   let thisSection = 0;
   for (const n of nums) {
      currentRun++;
      thisSection++;
      if (n === 0){
         if (workingK === 0) {
            // need to remove a previous bridge
            if (head < bridged.length) {
               const prev = bridged[head++];
               currentRun -= prev;
               workingK++;
            } else {
               currentRun = 0;
               thisSection = 0;
               continue;
            }
         }
         workingK--;
         bridged.push(thisSection);
         thisSection = 0;
      }
      if (currentRun > max) {
         max = currentRun;
      }
   }
   return max;
}
