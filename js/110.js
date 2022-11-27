c=(a,b,c)=>b?!(a&c):c
c=(a,b,c)=>b?!a|!c:c
c=(a,b,c)=>b&!a|c^b

console.log(c(0, 0, 0), 0)
console.log(c(0, 0, 1), 1)
console.log(c(0, 1, 0), 1)
console.log(c(0, 1, 1), 1)
console.log(c(1, 0, 0), 0)
console.log(c(1, 0, 1), 1)
console.log(c(1, 1, 0), 1)
console.log(c(1, 1, 1), 0)
