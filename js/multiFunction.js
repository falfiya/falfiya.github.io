function caught(what) {

}

const multi = new Proxy(class _ {}, {
   get(o, k) {
      if (k === Symbol.toPrimitive) {
         return hint => {
            switch (hint) {
               case "number": {
                  caught("a coercion to Number");
                  break;
               }
               case "string": {
                  caught("`${multi}`");
                  break;
               }
               default: {

               }
            }
         };
      } if (k === Symbol.iterator) {
         caught("[...multi] or multi[Symbol.iterator]");
         return function* () { yield };
      }
      caught(`multi[${k}]`);
   },

   set(o, k, v) {
      caught(`multi[${k}] = ${v}`);
   },

   apply(f, t, a) {
      if (a[0].raw) {
         const T = a.slice(1);
         const s = a[0];
         caught(`multi\`${s.map((v, i) => v + (T[i] ? `\${${T[i]}}` : "")).join``}\``);
      } else {
         caught(`multi(${a.join(", ")})`);
      }
   },

   construct(t, a) {
      caught(`new multi(${a.join(", ")})`);
      return this;
   },

   has(t, v) {
      caught(`${v} in multi`);
   },

   deleteProperty(t, v) {
      caught(`delete multi[${v}]`);
   },
});
