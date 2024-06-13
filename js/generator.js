function* countToFive() {
   for (let i = 1; i <= 5; i++) {
      console.log("countToFive", yield i);
   }
   return "done!";
}

function *countToTen() {
   console.log("countToTen", yield* countToFive());
   for (let i = 6; i <= 10; i++) {
      console.log("countToTen", yield i);
   }
}

let gen = countToTen();

for (let i = 100; i <= 110; i++) {
   console.log("loop", gen.next(i));
}
