/**
 * If a `number` is less than a 1000th away from being an integer.
 * @param {number} n
 * @returns {boolean}
 */
export default function isPrettyMuchAnInteger(n) {
   return Math.abs(n - (n|0)) < 0.001;
}
