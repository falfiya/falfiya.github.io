import fpr from "../../js/fpr.js";

const ALIGN_PADDING = 34;

function label(key, val) {
   return `${key}: ${val.padStart(ALIGN_PADDING - key.length, " ")}`;
}

function displayOutput() {
   const [dpx, cpx] = fpr();
   /** @type {string[]} */
   const out = [];
   const dpr = devicePixelRatio;
   out.push(label("dppx", `${dpr} * dpx * cpx`));
   out.push(label("fdpr", `${dpx}dpx / ${cpx}cpx`));
   out.push(label("screen", `${screen.width * dpr | 0}dpx, ${screen.height * dpr | 0}dpx`));
   out.push("");
   out.push(label("date", new Date().toLocaleTimeString()));
   c.innerText = out.join("\n");
}

window.addEventListener("resize", displayOutput);

displayOutput();
