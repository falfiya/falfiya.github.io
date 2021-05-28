const create_mro = prototypes => new Proxy(Object.create(null), {
   get(_, key) {
      for (const proto of prototypes) {
         if (Object.prototype.hasOwnProperty.call(proto, key)) {
            return proto[key];
         }
      }
      return undefined;
   },
});

const extend_multiple = (classes, clazz) => {
   Object.setPrototypeOf(
      clazz.prototype,
      create_mro(classes.map(c => c.prototype)),
   );
   return clazz;
};

class Cat {
   meow() { console.log("meow") }
}

class Dog {
   bark() { console.log("bark") }
}

const Cog = extend_multiple([Cat, Dog], class Cog {
   mark() {
      this.meow();
      this.bark();
   }
});

new Cog().mark();
