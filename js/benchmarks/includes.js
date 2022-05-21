const Benchmark = require("benchmark");
const suite = new Benchmark.Suite;

const short_array = [
   "dog",
   "cat",
   "chicken",
   "hen",
   "magpie",
   "emu",
   "pig",
   "horse",
   4, 2, 0
];

const long_array = [
   ...short_array,
   "fridge",
   "time",
   "to",
   "get",
   "a",
   "watch",
   0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

function get_random_element() {
   return long_array[Math.random() * long_array.length | 0];
}

suite.add("Array#includes", () => {
   short_array.includes(get_random_element())
});
suite.add("for loop", () => {
   const needle = get_random_element();
   const l = short_array.length;
   for (let i = 0; i < l; i++) {
      const curr = short_array[i];
      if (curr === needle) {
         return;
      }
   }
});
suite.run()
console.log(suite);
