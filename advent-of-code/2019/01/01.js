const fs = require("fs");

function required_fuel(mass) {
   const out = ~~(mass / 3) - 2;
   return out > 0 && out + required_fuel(out);
}

const fuel_needed = (
   require("fs")
      .readFileSync("input.txt", "utf8")
      .split('\n')
      .map(s => required_fuel(s))
      .reduce((a, v) => a + v, 0)
);

console.log(fuel_needed);
