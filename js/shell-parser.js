const fs = require("fs");
const child_process = require("child_process");

class ParseShellLineIntoArguments {
   constructor () {
      this.state = ["normal"];
      this.currentWord = "";
      this.arguments = [];
   }

   getState() {
      return this.state[this.state.length - 1];
   }

   pushState(state) {
      this.state.push(state);
   }

   popState(state) {
      return this.state.pop();
   }

   take(chr) {
      switch (this.getState()) {
         case "normal": return this.takeNormal(chr);
         case "inString": return this.takeInString(chr);
         case "escaped": return this.takeEscaped(chr);
      }
   }

   flush() {
      this.arguments.push(this.currentWord);
      this.currentWord = "";
   }

   flushIfNotEmpty() {
      if (this.currentWord !== "") {
         this.flush();
      }
   }

   takeNormal(chr) {
      if (chr === '"') {
         this.pushState("inString");
         return;
      }

      if (chr === "\\") {
         this.pushState("escaped");
         return;
      }

      if (chr === " ") {
         this.flushIfNotEmpty();
         return;
      }

      if (chr === "\r") {
         return;
      }

      this.currentWord += chr;
   }

   takeInString(chr) {
      if (chr === '"') {
         this.popState();
         return;
      }

      if (chr === "\\") {
         this.pushState("escaped");
         return;
      }

      this.currentWord += chr;
   }

   takeEscaped(chr) {
      this.currentWord += chr;
      this.popState();
   }
}

const b = Buffer.allocUnsafe(1);
function readStdin() {
   fs.readSync(0, b);
   return b.toString("utf8");
}

while (true) {
   const p = new ParseShellLineIntoArguments();
   while (true) {
      const c = readStdin();
      if (c === "\n") break;
      p.take(c);
   }
   p.flushIfNotEmpty();
   console.log(p.arguments);
   child_process.spawnSync(p.arguments[0], p.arguments.slice(1), {
      cwd: process.cwd(),
      detached: true,
      stdio: "inherit"
    });
}
