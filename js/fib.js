#!/usr/bin/env node

var a = 0|0;
var b = 1|0;
var c = 0|0;
var count = process.argv[2]|0;
function put(i) {
   i |= 0;
   process.stdout.write((i|0) + " ");
}
if ((count|0) > 0) {
   put(0);
   if ((count|0) > 1) {
      put(1);
      if ((count|0) > 2) {
         count = (count|0) - 2;
         while (count > 0) {
            c = (a|0) + (b|0);
            a = (b|0);
            b = (c|0);
            put(c|0);
            count = (count|0) - 1;
         }
      }
   }
}
process.stdout.write('\n');
process.exit(0);
