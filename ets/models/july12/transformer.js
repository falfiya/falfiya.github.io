process.chdir(__dirname);
const fs = require("fs");

const raw = fs.readFileSync("./ets.txt", "utf8");

let rows = raw.split("\n").map(line => line.split("\t").map(cell => cell || undefined));

let out = "<table>";

const header = rows[0];
rows = rows.slice(1);

for (let row of rows) {
   for (let i = 0; i < row.length; i++) {
      const brand = header[i];
      console.log(brand);
      const cell = row[i];
      if (cell) {
         out += `\n<tr><td>${brand}</td><td>???</td><td>${cell}</td></tr>`
      }
   }
}

out += "</table>";
fs.writeFileSync("ets.html", out);
