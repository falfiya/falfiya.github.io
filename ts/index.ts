import {Option, Some, None} from "./Option.ts"; // deno likes it like that though

const o: Option<string> = Math.random() > .5 ? Some("body once told me...") : None;
o.match(({
   Some(v) {
      console.log(`Some(${v})`);
   },
   None() {
      console.log("None");
   }
}));
