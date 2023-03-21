likes=n=>(["no one",n[0],n.join` and `,`${n[0]}, ${n[1]} and ${n[2]}`][n.length]||`${n[0]}, ${n[1]} and ${n.length-2} others`)+(n.length<2?" likes this":" like this")
likes=(n,l=n.length)=>(["no one",n[0],n.join` and `,`${n[0]}, ${n[1]} and ${n[2]}`][l]||`${n[0]}, ${n[1]} and ${l-2} others`)+(l<2?" likes this":" like this")
likes=(n,l=n.length)=>`${["no one",n[0],n.join` and `,`${n[0]}, ${n[1]} and ${n[2]}`][l]||`${n[0]}, ${n[1]} and ${l-2} others`} like${l<2?"s":""} this`
likes=(n,l=n.length,[x,y,z]=n)=>`${["no one",x,n.join` and `,`${x}, ${y} and ${z}`][l]||`${x}, ${y} and ${l-2} others`} like${l<2?"s":""} this`
likes=(n,l=n.length,[x,y,z]=n)=>`${["no one",x,n.join` and `][l]||(`${x}, ${y} and `+(l<4?z:l-2+" others"))} like${l<2?"s":""} this`
likes=(n,l=n.length,[x,y,z]=n)=>`${["no one",x,n.join` and `][l]||(x+", "+y+" and "+(l<4?z:l-2+" others"))} like${l<2?"s":""} this`
likes=(n,l=n.length,[x,y,z]=n)=>`${["no one",x,x+" and "+y][l]||(x+", "+y+" and "+(l<4?z:l-2+" others"))} like${l<2?"s":""} this`
likes=(n,l=n.length,[x,y,z]=n)=>`${["no one",x,x+" and "+y][l]||`${x}, ${y} and ${l<4?z:l-2+" others"}`} like${l<2?"s":""} this`
likes=(n,l=n.length,[x,y,z]=n)=>`${["no one",x,x+" and "+y][l]||`${x}, ${y} and ${l<4?z:l-2+" others"}`} like${y?"":"s"} this`
