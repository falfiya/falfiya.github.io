const pipes=(_=>_=((P,A=Array.isArray)=>(...f)=>(...a)=>f.reduce((b,w)=>(A(w)?w.map(v=>(A(v)?_(...v)(...b):P(b,v))):[P(b,w)]),a)[0])((a,v)=>(~~v==v?a[v]:v(...a))))();
const gather=(...a)=>a;
const w=f=>(...a)=>_=>f(...a)
