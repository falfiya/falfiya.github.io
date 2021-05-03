const fs = require("fs");

const get_info_json_rec = dir =>
   fs.readdirSync(dir, {withFileTypes: true})
      .map(dirent =>
         dirent.isDirectory()
         ? get_info_json_rec(`${dir}/${dirent.name}`)
         : [`${dir}/${dirent.name}`])
      .flat();

module.exports = get_info_json_rec;
