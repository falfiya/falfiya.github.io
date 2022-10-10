class EnumerableError extends Error {
   constructor (s) {
      super(s);
      this.secret = "Oh no! You can see me in the stack trace!";
   }
}

class UnenumerableError extends Error {
   constructor (s) {
      super(s);
      Object.defineProperty(this, "secret", {
         enumerable: false,
         value: "Yay! I'm hidden!",
      });
   }
}


console.error(new EnumerableError("foo"));
console.error(new UnenumerableError("bar"));
