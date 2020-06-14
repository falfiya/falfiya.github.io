import isPrettyMuchAnInteger from "./isPrettyMuchAnInteger.js";

/** @typedef {import("../ts/pixels")} */

/**
 * See {@link https://github.com/coalpha/based-canvas|coalpha/based-canvas}.
 * Gets the `DisplayPixels` and `CSSPixels` that make up the `devicePixelRatio`
 * @returns {[?DisplayPixels, ?CSSPixels]}
 */
export default function getFractionalPixelRatio() {
   const dpr = window.devicePixelRatio;
   for (let co = 1; co < 100; co++) {
      if (isPrettyMuchAnInteger(dpr * co)) {
         return [Math.round(dpr * co), co];
      }
   }
   return [null, null];
}
