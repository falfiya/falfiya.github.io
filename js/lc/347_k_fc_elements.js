function topKFrequent(nums, k) {
   const fcount = {};
   for (const n of nums) {
      fcount[n] = (fcount[n] | 0 ) + 1;
   }
   return Object.entries(fcount)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .map(([a,]) => a|0).slice(0, k);
}

topKFrequent=(n,k,c={})=>(n.map(n=>c[n]=1+~~c[n]),Object.entries(c).sort((a,b)=>b[1]-a[1]).map(a=>+a[0]).slice(0,k))
