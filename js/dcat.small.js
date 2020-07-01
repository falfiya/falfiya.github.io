#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");

const { orange, reset, pink } = process.env;

process.argv.slice(2).forEach(dir => {
   fs.readdirSync(dir).forEach(file => {

      const data = fs.readFileSync(join(dir, file), "utf8");
      data.split("\n").forEach(line => {

      });

   });
});
