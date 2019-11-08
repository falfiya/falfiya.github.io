import {Option, Some, None} from "./Option"; // deno likes it like that though

const o: Option<string> = Math.random() > .5 ? Some("body once told me...") : None;
o.match({
   Some(v) {
      Some(v).map_or(1, a => parseInt(a, 10));
      console.log(`Some(${v})`);
   },
   None() {
      console.log("None");
   }
});
