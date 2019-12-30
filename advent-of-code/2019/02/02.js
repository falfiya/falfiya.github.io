const fs = require("fs");

const buffer_length = 0xFF;
/** @type {Array<Number>} */
const buffer = fs.readFileSync("input.ic", "utf8").split(",").map(a => a|0);

const e = process.stderr.write.bind(process.stderr);

function dump() {
   e(buffer.join() + "\n");
   process.exit(1);
}

let i = 0;
let opcode;
let a_ptr;
let b_ptr;
let r_ptr;

function segfault(ptr, m) {
   e(`Segmentation fault at ${i} to ${i + 3}. Pointer "${ptr}" is ${m}. (core dumped)\n`);
   dump();
}

function chk(ptr) {
   if (!Number.isInteger(ptr)) {
      segfault(ptr, "not an integer");
   }
   if (ptr < 0) {
      segfault(ptr, "negative");
   }
   if (ptr >= buffer_length) {
      segfault(ptr, `greater than the addressable space (max = ${buffer_length})`);
   }
}

function read(ptr) {
   chk(ptr);
   return buffer[ptr];
}

function mov(val, ptr) {
   chk(ptr);
   buffer[ptr] = val;
}

loop:
while (true) {
   a_ptr = buffer[i + 1];
   b_ptr = buffer[i + 2];
   r_ptr = buffer[i + 3];
   switch (opcode = buffer[i]) {
      case 1: {
         mov(read(a_ptr) + read(b_ptr), r_ptr);
         break;
      }
      case 2: {
         mov(read(a_ptr) * read(b_ptr), r_ptr);
         break;
      }
      case 99: {
         break loop;
      }
      default: {
         e(`Panic at ${i}\n   Unknown opcode "${opcode}"\n`);
         dump();
      }
   }
   i += 4;
}

process.stdout.write(buffer[0] + "\n");
