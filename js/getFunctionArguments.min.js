export default (
   fn =>
      fn
         .toString()
         .match(/([.\w]+,*\s*)+/)[0]
         .split(",")
         .map(v => v.replace(/\s/, ""))
);
