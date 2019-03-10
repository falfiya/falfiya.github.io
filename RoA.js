const readline = require("readline");


const chars = [
  "Absa",
  "Clairen",
  "Elliana",
  "Forsburn",
  "Kragg",
  "Orcane",
  "Ori",
  "Ranno",
  "Shovel",
  "Knight",
  "Sylvanos",
  "Wrastor",
  "Zetterburn"
];
function rend(ary) {
  const splitdex = ~~ary.length / 2;
  return [ary.slice(0, splitdex), ary.slice(splitdex)];
}
rend(chars);
