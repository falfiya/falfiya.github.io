function expr(s) {
   let r = null;
   while (r !== s) {
      // Laurel's idea not my fault.
      r = s;
      s = s.replace(/(.*)\^/,"($1)");
   }

   return term(s);
}

function term(s) {
   const [a, s1] = product(s);

   if (a == null) {
      return [null, null];
   }

   if (s1[0] !== "+") {
      return [a, s1];
   }

   const s2 = s1.slice(1);

   let [b, s3] = product(s2);

   if (b == null) {
      return [a, s1];
   }

   return [{op: "term", left: a, right: b}, s3];
}

function product(s) {
   let [a, s1] = variable(s);

   if (a == null) {
      return [null, null];
   }

   if (s1[0] !== "*") {
      return [a, s1];
   }

   const s2 = s1.slice(1);

   let [b, s3] = variable(s2);

   if (b == null) {
      return [a, s1];
   }

   return [{op: "times", left: a, right: b}, s3];
}

function variable(s) {
   if (s[0] === "(") {
      const [e1, s1] = expr(s.slice(1));
      if (e1 === null) {
         return [null, null];
      }

      if (s1[0] !== ")") {
         return [null, null];
      }

      return [e1, s1.slice(1)];
   }

   const m = s.match(/^[a-z]+/);
   if (m == null) {
      return [null, null];
   }

   return [{op: "variable", name: m[0]}, s.slice(m.length)];
}
