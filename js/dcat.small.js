#!/usr/bin/env node
const fs = require("fs");
const { join } = require("path");

const orange = process.env.orange;
const reset = process.env.reset;
const pink = process.env.pink;

process.argv.slice(2).forEach(dir => {
  fs.readdirSync(dir).forEach(file => {
    console.log(`${pink}${file}${reset}:`);
    const data = fs.readFileSync(join(dir, file), "utf8");
    data.split('\n').forEach(line => {
      console.log(`  ${orange}|${reset}  ${line}`);
    });
    console.log('\n');
  })
});
