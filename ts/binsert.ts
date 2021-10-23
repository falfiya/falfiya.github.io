type Ord = -1 | 0 | 1;
/**
 * @returns
 *    -1 if a < b
 *     0 if a = b
 *    +1 if a > b
 */
type Cmp<T> = (a: T, b: T) => Ord;

export function binsert_ts<T>(ary: T[], val: T, cmp: Cmp<T>): boolean {
   var lower = 0;
   var upper = ary.length;
   while (lower !== upper) {
      const halfLength = upper - lower >> 1;
      const pivot = lower + halfLength;
      switch (cmp(val, ary[pivot])) {
         case -1:
            upper = pivot;
            continue;
         case +1:
            lower = pivot + 1;
            continue;
         default:
            return false;
      }
   }
   ary.splice(lower, 0, val);
   return true;
}
