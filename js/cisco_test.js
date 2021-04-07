process.stdin.resume();
process.stdin.setEncoding("utf-8");
var buf = "";

process.stdin.on("data", input => buf += input);

process.stdin.on("end", main);

// probably wanna cache these if this was in production, for instance
function all_permutations(to_chose, previous_choices = []) {
   if (to_chose.length === 0) {
      return previous_choices;
   }
   if (to_chose.length === 1) {
      return [...previous_choices, to_chose[0]];
   }
   const fst = all_permutations(
      to_chose.slice(2),
      [...previous_choices, to_chose[0]],
   );
   const snd = all_permutations(
      to_chose.slice(3),
      [...previous_choices, to_chose[1]],
   );
   return {fst, snd};
}

all_permutations([5, 30, 99, 60, 5, 10]);

function max(tree) {
   if (Array.isArray(tree)) {
      return tree.reduce((a, v) => a + v, 0);
   }

   return Math.max(max(tree.fst), max(tree.snd));
}

// I don't even wanna know what time complexity this is
// it's like O(n^2) right
// there's a smarter way to do this using beta reduction (I think?)
// you might also be able to use dijkstra's pathfinding algo to speed this up
// I am, however, short of time to figure out how to do that
function main() {
   const lines = buf.split("\n");
   const jars = lines[1].split(" ").map(s => s | 0);
   process.stdout.write(`${max(all_permutations(jars))}`);
}
