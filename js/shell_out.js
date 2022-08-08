function lol() {
   //$ cd ..
   dir
}

function get_source(fn) {
   const raw = fn.toString();
   const start = raw.indexOf("{") + 1;
   const end = raw.lastIndexOf("}");
   const inner = raw.slice(start, end);
   const lines = inner.split("\n");
   return lines.map(x => x.trim()).filter(x => x);
}

const {spawnSync} = require("child_process");
function run(fn) {
   spawnSync("cmd.exe", ["/C", get_source(fn).join(" & ")], {stdio: "inherit"})
}

run(lol);
