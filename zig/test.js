const fs = require("fs");
const source = fs.readFileSync("./math.wasm");
const typedArray = new Uint8Array(source);

void async function main() {
   const WASM = await WebAssembly.instantiate(
      typedArray,
      {
         env: {
            print: result => { console.log(`The result is ${result}`) },
         },
      },
   );

}();
