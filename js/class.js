class Superman {
   constructor () {
      this.name = "Superman";
   }

   me() {
      return this;
   }
}

class Subarman extends Superman {
   constructor () {
      super();
      this.name = "Subarman";
   }

   parent() {
      return this;
   }
}
