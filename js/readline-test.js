const fs = require("fs");

let lineBuffer = Buffer.allocUnsafe(0xff);

function readline() {
   process.stdout.write("> ");
   let bufferStart = 0;
   
   const l = lineBuffer.length;
   let end = 0;

   // working buffer
   let b = lineBuffer;
   const bytesRead = fs.readSync(0, b, 0, l, null);
   const lastChar = bytesRead - 1;
   end += bytesRead;

   if (bytesRead < l)
   if (lineBuffer[lastChar] === 0x0a)
   {
      b = Buffer.allocUnsafe(0xff);
      const bytesRead = fs.readSync(0, b, 0, l, null);
      const lastChar = bytesRead - 1;
      end += bytesRead;
      lineBuffer = Buffer.concat(lineBuffer, b);

      if (bytesRead < l)
      if (lineBuffer[lastChar] === 0x0a)
   }

   while (true) {
      const bytesRead = fs.readSync(0, b, 0, l, null);
      const lastChar = bytesRead - 1;
      end += bytesRead;
      if () break;
      if () break;
      
   }
    {
      const newbuffer = Buffer.allocUnsafe(l);
      
      lineBuffer = Buffer.concat(lineBuffer, );
   }

   
   console.log(lineBuffer[l - 1]);
   const lastcharacterwasnewline = lineBuffer[l - 1] === "\n".charCodeAt(0);
   if (lastcharacterwasnewline) {
      return;
   }
   console.log("oh no!");
}

readline();
