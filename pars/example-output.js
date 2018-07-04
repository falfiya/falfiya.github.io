debrujin=(a,n,b=a.length,s=a[0].repeat(n),A=0)=>{while(s.length<b**n-1+n)s.match(s.slice(1-n)+a[A])?++A<b||(A=a.indexOf(s.slice(-1))+1,s=s.slice(0,-1)):(s+=a[A],A=0);return s}
