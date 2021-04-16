const
   fs
      = require("fs"),
   dead_cells_controller_file
      = "P:/lib/Steam/steamapps/common/Dead Cells/save/options.json",
   opts
      = JSON.parse(
         fs.readFileSync(
            dead_cells_controller_file, "utf8"));

opts.keyboard
   = Object.fromEntries(
      Object.entries(opts.keyboard)
         .map(([key, [first]]) =>
            [key, [first, null, null]]));

fs.writeFileSync(dead_cells_controller_file,
   JSON.stringify(opts, null, "\t"));
