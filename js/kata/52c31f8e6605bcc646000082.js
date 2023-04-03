function twoSum(h, n) {
   for (let i = 0; i < h.length; i++) {
      for (let j = 0; j < h.length; j++) {
         if (j === i) {
            continue;
         }
         if (h[i] + h[j] == n) {
            return [i, j];
         }
      }
   }
}
twoSum=(h,n)=>h.flatMap((e,i)=>h.map((f,j)=>i==j?0:e+f==n?[i,j]:0)).find(x=>x)
twoSum=(h,n)=>h.flatMap((e,i)=>h.map((f,j)=>[e+f==n&&[i,j]][i^j])).find(x=>x)
twoSum=(h,n)=>h.flatMap((e,i)=>h.map((f,j)=>i^j?e+f-n?0:[i,j]:0)).find(x=>x)
