#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");

const { orange, reset, pink } = process.env;

function print_file(file) {
   const data = fs.readFileSync(file, "utf8");
   data.split("\n").forEach(line => {

   });
}

function print_dir(dir) {
   const files = fs.readdirSync(dir);
   files.forEach(file => {

      print_file(join(dir, file));

   });
}

function dcat(dirs) {
   dirs.forEach(print_dir);
}

dcat(process.argv.slice(2));
