export default (o, k, v) => {
   if (Array.isArray(o[k])) {
      return o[k].push(v);
   }
   o[k] = [v];
   return 1;
};
