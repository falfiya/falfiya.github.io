#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");

const orange = process.env.orange;
const reset = process.env.reset;
const pink = process.env.pink;

function print_file(file) {
  const data = fs.readFileSync(file, "utf8");
  data.split('\n').forEach(line => {
    console.log(`  ${orange}|${reset}  ${line}`);
  });
}

function print_dir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    console.log(`${pink}${file}${reset}:`);
    print_file(join(dir, file));
    console.log('\n');
  });
}

function dcat(dirs) {
  dirs.forEach(print_dir);
}

dcat(process.argv.slice(2));
