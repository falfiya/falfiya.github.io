/** insert unique values into an array */
function binsert(ary, val) {
   var lower = 0;
   var upper = ary.length;
   while (lower !== upper) {
      const halfLength = upper - lower >> 1;
      const pivot = lower + halfLength;
      if (val < ary[pivot]) {
         upper = pivot;
         continue;
      }
      if (val > ary[pivot]) {
         lower = pivot + 1;
         continue;
      }
      return false;
   }
   ary.splice(lower, 0, val);
   return true;
}

const rAry = [...Array(20)].map((_, i) => i).sort(() => .5 - Math.random());

console.log(rAry);

const sAry = [];

rAry.forEach(val => binsert(sAry, val));

console.log(sAry);
