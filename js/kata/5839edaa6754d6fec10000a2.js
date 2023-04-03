findMissingLetter=a=>{for(i=0;i<a.length-1;i++){if(a[i+1].charCodeAt(0)==a[i].charCodeAt(0)+2){return String.fromCharCode(a[i].charCodeAt(0)+1)}}}
findMissingLetter=a=>{a=a.map(x=>x.charCodeAt``);for(i=0;i<a.length-1;i++){if(a[i+1]==a[i]+2){return String.fromCharCode(a[i]+1)}}}
findMissingLetter=a=>String.fromCharCode(a.map(x=>x.charCodeAt``).find((e,i,a)=>e+2==a[i+1])+1)
