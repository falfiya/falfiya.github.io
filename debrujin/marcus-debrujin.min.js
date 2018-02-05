r=(n,d=1+'0'.repeat(n),r=_=>d.match(d.slice(1-n)+_)?0:d+_)=>{for(;d.length<2**n+n-1;d=r(0)||r(1)||d.replace(/01*$/,1));return d}
