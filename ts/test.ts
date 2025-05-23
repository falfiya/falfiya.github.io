function proxyNewDate(d) {
   return new Proxy(d, {
      get(orig, prop, __) {
         if (prop === "constructor") {
            throw new Error("Cannot get constructor from date!");
         }
         // @ts-expect-error
         return orig[prop];
      }
   })
}

function mockDate(d) {
   let unmocked = globalThis.Date
   let date = new unmocked(d)
   let startOfMock = unmocked.now()
   globalThis.Date = new Proxy(unmocked, {
      apply: function (Target, thisArg, args) {
         return new Target(
            date.getTime() + (unmocked.now() - startOfMock)
         ).toString()
      },
      construct: function (Target, args) {
         // props to https://stackoverflow.com/a/43160428/671457
         if (args.length === 0) {
            return new Target(date.getTime() + (unmocked.now() - startOfMock))
         }
         // @ts-expect-error
         return new Target(...args)
      },
      get: function (Target, prop, receiver) {
         if (prop === "now") {
            return () => proxyNewDate(date.getTime() * 1 + (unmocked.now() - startOfMock))
         }
         // @ts-expect-error
         return Reflect.get(...arguments)
      },
   })
}

function mockDate(d) {
   let unmocked = globalThis.Date
   let date = new unmocked(d)
   let startOfMock = unmocked.now()
   const getDateProxy = () =>
     new Proxy(unmocked, {
       apply: function (Target, thisArg, args) {
         return new Proxy(
           new Target(date.getTime() + (unmocked.now() - startOfMock)),
           {
             get(target, symbol, receiver) {
               if (symbol.toString() == "__proto__") {
                 throw new Error("Cannot get proto")
               }
               if (symbol.toString() == "constructor") {
                 throw new Error("Cannot get constructor")
               }
               // @ts-expect-error
               return Reflect.get(...arguments)
             },
           }
         )
       },
       construct: function (Target, args) {
         // props to https://stackoverflow.com/a/43160428/671457
         if (args.length === 0) {
           return new Target(date.getTime() + (unmocked.now() - startOfMock))
         }
         // @ts-expect-error
         return new Target(...args)
       },
       get: function (Target, prop, receiver) {
         if (prop === "now") {
           return () => date.getTime() * 1 + (unmocked.now() - startOfMock)
         }
         if (prop === "constructor") {
           return (...props) => {
             receiver(...props)
           }
         }
         // @ts-expect-error
         return Reflect.get(...arguments)
       },
     })
   globalThis.Date = new Proxy(unmocked, {
     apply: function (Target, thisArg, args) {
       return new Target(
         date.getTime() + (unmocked.now() - startOfMock)
       ).toString()
     },
     construct: function (Target, args) {
       // props to https://stackoverflow.com/a/43160428/671457
       if (args.length === 0) {
         return new Target(date.getTime() + (unmocked.now() - startOfMock))
       }
       // @ts-expect-error
       return new Target(...args)
     },
     get: function (Target, prop, receiver) {
       if (prop === "now") {
         return () => date.getTime() * 1 + (unmocked.now() - startOfMock)
       }
       if (prop === "constructor") {
         return (...props: any[]) => {
           new receiver(props)
         }
       }
       // @ts-expect-error
       return Reflect.get(...arguments)
     },
   })
}

mockDate("October 1 2001")
