let a=new Function('let f=arguments.callee,c=""+f,w=window,n=f.a+"_";w[n]=new Function(c.slice(26,c.length-1));w[n].a=n;delete w[f.a]');
a.a='a';
