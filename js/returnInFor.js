const a10 =[...Array(10)];
const XX = a10.map((_, i) => i);
const YY = a10.map((_, i) => i);

for (const x of XX) {
   for (const y of YY) {
      console.log(`(${x}, ${y}) `)
      if (y === 3) {
         return;
      }
   }
   console.log("-");
}

// this will never run
console.log("done!");
