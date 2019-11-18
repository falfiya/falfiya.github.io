const types = {
   boolean(v) {
      return typeof v === "boolean";
   },
   NaN: Number.isNan,
   number(v) {
      return typeof v === "number" && !this.NaN(v);
   },
   string(v) {
      return typeof v === "string";
   },
   integer: Number.isInteger,
   array: Array.isArray,
   object(v) {
      return typeof v === "object";
   },
   positiveNumber(v) {
      return this.number(v) && v > 0;
   },
   positiveInteger(v) {
      return this.integer(v) && v > 0;
   },
   negativeNumber(v) {
      return this.number(v) && v < 0;
   },
   negativeInteger(v) {
      return this.integer(v) && v < 0;
   },
};
export default (fnName, ...ary) => (...args) => {
   ary.forEach((v, i) => {
      const test = types[v].bind(types);
      if (!test(args[i])) {
         throw new Error(`Argument ${i + 1} to ${fnName} is not a(n) ${v}!`);
      }
   });
};
