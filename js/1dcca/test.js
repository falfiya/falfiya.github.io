const min = require("./main.min");
const reference = require("./reference");

const refInit = reference(110, 7);
const minInit = min(110, 7);

let allPassed = 1;
for (let i = 0; i < 2 ** 7; i++) {
   const bool = refInit(i) === minInit(i);
   allPassed &= bool;
   console.assert(bool, `Testing ${i}`);
}

if (allPassed) {
   console.log("All tests passed");
} else {
   console.log("Some tests failed");
}
