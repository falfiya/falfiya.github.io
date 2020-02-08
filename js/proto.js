const proto = {};
proto.String = {
   mince() {
      return this.split("");
   },
   reverse() {
      return this.mince().reverse().join("");
   },
   diceNoRemainder(n) {
      return this.match(new RegExp(`[\\s\\S]{${n}}`, "g"));
   },
   dice(n) {
      let d = this.diceNoRemainder(n);
      const xs = -this.length % n;
      if (xs) {
         d = d.shove(this.slice(xs));
      }
      return d;
   },
   prefix(v, l) {
      const count = l - this.length;
      return `${v}`.repeat(count > 0 && count).concat(this);
   },
   every: Array.prototype.every,
   filter: Array.prototype.filter,
   find: Array.prototype.find,
   forEach: Array.prototype.forEach,
   includes: Array.prototype.includes,
   map: Array.prototype.map,
   reduce: Array.prototype.reduce,
};
proto.Array = {
   // Pure
   copy() {
      return this.slice();
   },
   shove(...args) {
      const ary = this.copy().push(...args);
      return ary;
   },
   removeIndex(i) {
      return this.copy().mRemoveIndex(i);
   },
   snap() {
      return this.slice(0, -1);
   },
   pureReverse() {
      return this.copy().reverse();
   },
   pureSplice(...args) {
      return this.copy().splice(...args);
   },
};
proto.Object = {
   copy() {
      return { ...this };
   },
   keysArray() {
      return Object.keys(this);
   },
   identity() {
      return this;
   },
   forEachKey(fn) {
      this.keysArray().forEach(fn);
      return this;
   },
   mapKeys(fn) {
      return this.keysArray().map(fn);
   },
   map(fn) {
      const temp = {};
      this.forEach((v, k) => temp[k] = fn(v, k, this));
      return temp;
   },
   forEach(fn) {
      this.keysArray().forEach((k, i) => fn(this[k], k, this));
   },
   reduce(fn, acc) {
      this.forEach((v, i, a) => acc = fn(acc, v, i, a));
      return acc;
   },
   count(fn) {
      return this.filter(fn).length;
   },
   pairs() {
      return Object.entries(this);
   },
   hasKey(k) {
      return this.hasOwnProperty(k);
   },
};
proto.Number = {
   times(fn) {
      return Array(+this).fill(0).map((v, i) => fn(i));
   },
};
proto.ArrayLike = {
   last() {
      return this[this.length - 1];
   },
   remove(i) {
      return this.mince().removeIndex(i).join``;
   },
   random() {
      return this[Math.round(Math.random() * this.length)];
   },
   rend(n) {
      return [this.slice(0, n), this.slice(n)];
   },
};

function patch(prototype, myPrototype) {
   Object.keys(myPrototype).forEach(key => {
      Object.defineProperty(prototype, key, { value: myPrototype[key] });
   });
}
patch(String.prototype, proto.ArrayLike);
patch(Array.prototype, proto.ArrayLike);
patch(String.prototype, proto.String);
patch(Array.prototype, proto.Array);
patch(Number.prototype, proto.Number);
patch(Object.prototype, proto.Object);
