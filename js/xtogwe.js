const { stdin } = process;

const write = s => process.stdout.write(s);

const rows = [
   "~!@#$%^&*()_+",
   "`1234567890-=",
   "QWERTYUIOP{}|",
   "qwertyuiop[]\\",
   "ASDFGHJKL:\"",
   "asdfghjkl;'",
   "ZXCVBNM<>?",
   "zxcvbnm,./",
].map(s => s.split(""));

const mins = (i, l) => (i === 0 ? l : i) - 1;

const plus = (i, l) => (i === (l - 1) ? 0 : i + 1);

function cc(char, fn) {
   for (const row of rows) {
      const i = row.indexOf(char);
      if (i !== -1) {
         return row[fn(i, row.length)];
      }
   }
   return char;
}

function cs(str, fn) {
   return str.split("").map(c => cc(c, fn)).join("");
}

function clear() {
   write("\u001b[2J\u001b[0;0H");
}

function usage() {
   clear();
   write("[+/-]\n");
}

usage();
let mode = null;
let fn;
stdin.setRawMode(true);
stdin.setEncoding("utf8");
stdin.resume();
stdin.on("data", str => {
   if (mode) {
      write(`= ${cs(str, fn)}`);
   } else if (str === "+" || str === "-") {
      mode = str;
      fn = mode === "+" ? plus : mins;
      stdin.setRawMode(false);
      write("\u001b[2J\u001b[0;0H");
   } else {
      return usage();
   }
   write(`${mode} `);
});
