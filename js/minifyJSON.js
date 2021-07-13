const fs = require("fs");

const dir = process.argv[2];

for (var file of fs.readdirSync(dir)) {
   if (file.endsWith(".json")) {
      console.log(file = `${dir}/${file}`);
      fs.writeFileSync(file, JSON.stringify(JSON.parse(fs.readFileSync(file))));
   }
}
