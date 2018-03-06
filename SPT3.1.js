trial=_=>Array(10).fill(0).map(_=>0|(Math.random()<.15)).map((v,i,a)=>v&&a[i+1]).find(_=>_==1);
hundredtrials=_=>Array(100).fill(0).map(_=>trial()||_).reduce((a,v)=>a+v,0)
