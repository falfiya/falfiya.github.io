
type upperBound = unknown;
// forall t. (t -> string) -> t -> string
function contrivedStringify<t extends upperBound>(toStr: (_: t) => string, x: t): string {
   return toStr(x);
}
// (forall t. t -> string) -> unknown -> string
function contrivedStringify2(toStr: <t extends typeof x>(_: t) => string, x: upperBound): string {
   return toStr(x);
}

contrivedStringify((n: number) => `${n}`, 1);
function upperToString(x: upperBound): string {
   switch (typeof x) {
   case "bigint":
      return `${x}n`;
   case "boolean":
      return x ? "True" : "False";
   case "number":
      return `${x}`;
   case "function":
      return `function ${x.name}(${Array(x.length).map((_, i) => `_${i}`).join(", ")})`
   case "object":
      if (x == null)
         return "null";
      else
         return `[object ${x.constructor.name}]`;
   case "string":
      return `"${x.replace(/"/g, "\\\"").replace(/\\/g, "\\\\")}"`;
   case "symbol":
      return `:${x.description}`;
   case "undefined":
      return "undefined";
   }
}
contrivedStringify2(upperToString, contrivedStringify2);
