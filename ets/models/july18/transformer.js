process.chdir(__dirname);
const fs = require("fs");

fs.writeFileSync("ets.html", "<table>" +
   fs.readFileSync("./ets.txt", "utf8")
      .split("\n")
      .map(line => {
         const cells = line.split("\t");
         console.log(cells);
         if (cells.length !== 3)
            return `<tr><td>${cells[0] ?? "???"}</td><td>${cells[1] ?? "???"}</td><td>${cells[2] ?? "???"}</td></tr>`
         const [tag, clazz, desc] = cells;
         if (tag)
            return `<tr><td>${tag}</td><td>${clazz}</td><td>${desc} - ${tag}</td></tr>`
         else
            return `<tr><td>${tag}</td><td>${clazz}</td><td>${desc}</td></tr>`})
      .join("\n")
      + "</table>");
