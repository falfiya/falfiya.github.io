xpd=a=>{
   let b = [];
   for(let i = 0; i < 2**a.length;i++){
      let m = 0;
      for(let d = 0; d < a.length;d++){
         if(i&(2**d)){
            m^=a[d];
         }
      }
      b.push(m);
   }
   return b;
};
size=m=>{
   let bits = 0;
   for(let d = 0; d <= Math.log2(m); d++){
      if(m&(2**d))bits++;
   }
   return bits;
};
minsize=a=>Math.min(...xpd(a).slice(1).map(size));
getgroup=(d,L)=>{
   let b=[];
   for(let j=0;j<L;j++){
       let i=b[b.length-1]||0;
       while(d>minsize([i,...b]))i++;
       b.push(i);
   }
   return b;
};
getsize=(d,L)=>xpd(getgroup(d,L));
