const fs = require("fs");

fs.readdirSync(".").forEach(filename => {
   if (filename.endsWith(".exe")) {
      // don't want to delete binaries that we don't have the source code for
      if (fs.existsSync(`${filename.slice(0, -3)}c`)) {
         console.log(`- ${filename}`);
         fs.unlinkSync(filename);
      } else {
         console.log(`| ${filename}`);
      }
   }
});
