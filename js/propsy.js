function error(msg) {
   if (typeof window === "undefined") {
      throw new Error(`${__filename}${msg}`);
   }
   throw new Error(`propsy${msg}`);
}

const notAllowed = what => error(` does not support ${what}`);

const proxy = new Proxy(Object.create(null), {
   get(...[, firstKey]) {
      const operations = [["field", firstKey]];
      const p = new Proxy(class c {}, {
         get(_, key) {
            operations.push(["field", key]);
            return p;
         },
         apply(f, self, args) {
            operations.push(["call", args]);
            return p;
         },
         // new _.thing is how you run it
         construct(o, args) {
            return datum => operations.reduce((A, [operation, opArgs]) => {
               switch (operation) {
                  case "field":
                     return A[opArgs];
                  case "call":
                     return A(...opArgs);
                  case "new":
                     return new A(...opArgs);
                  default:
                     return error(": Unknown operation");
               }
            }, datum);
         },
      });
      return p;
   },
   getPrototypeOf() { notAllowed(".getPrototypeOf"); },
   setPrototypeOf() { notAllowed(".setPrototypeOf"); },
   isExtensible() { notAllowed(".isExtensible"); },
   preventExtensions() { notAllowed(".preventExtensions"); },
   getOwnPropertyDescriptor() { notAllowed(".getOwnPropertyDescriptor"); },
   defineProperty() { notAllowed(".defineProperty"); },
   has() { notAllowed('"in"'); },
   set() { notAllowed("setting values"); },
   deleteProperty() { notAllowed("deleting values"); },
   ownKeys() { notAllowed(".getOwnProperty*"); },
});

module.exports = proxy;
