function solution(words: string[]): string[] {
   const ssSizeLookup: {[ssSize: number]: {[ss: string]: number}} = {};

   for (const word of words) {
      for (let ssSize = 1; ssSize <= word.length; ssSize++) {
         if (ssSizeLookup[ssSize] == null) {
            ssSizeLookup[ssSize] = {};
         }
         const ssCount = ssSizeLookup[ssSize];

         for (let i = 0; i <= word.length - ssSize; i++) {
            const ss = word.slice(i, i + ssSize);
            if (ssCount[ss] == null) {
               ssCount[ss] = 0;
            }
            ssCount[ss]++;
         }
      }
   }

   const outArray: string[] = [];
   for (const word of words) {
      let foundMnemonic = false;

      for (let ssSize = 1; ssSize <= word.length; ssSize++) {
         const ssCount = ssSizeLookup[ssSize];
         const earliestSS = {};
         const myOwnCount = {};
         for (let i = 0; i <= word.length - ssSize; i++) {
            const ss = word.slice(i, i + ssSize);
            if (earliestSS[ss] == null) {
               earliestSS[ss] = i;
               myOwnCount[ss] = ssCount[ss];
            }
            myOwnCount[ss]--;
            if (myOwnCount[ss] === 0){
               // good!
               const earliest = earliestSS[ss];
               const start = word.slice(earliest, earliest + ssSize);
               const middle = ss;
               const end = word.slice(earliest + ssSize);
               outArray.push(`${start}<u>${middle}</u>${end}`);
               break;
            }
         }

         if (foundMnemonic) {
            break;
         }
      }

      if (foundMnemonic) {
         continue;
      }

      outArray.push(word);
   }

   return outArray;
}
