function multiObject(...args) {
   const l = args.length;
   return new Proxy({}, {
      get(target, key) {
         for (var i = 0; i < l; ++i) {
            if (key in args[i]) {
               return args[i][key];
            }
         }
      },
   });
}


class A {
   aMethod() {
      console.log("a method");
   }
}

class B {
   bMethod() {
      console.log("b method");
   }
}

function C() {}
C.prototype = multiObject(A.prototype, B.prototype);

const c = new C();

c.aMethod();
c.bMethod();
