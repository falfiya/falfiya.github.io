class BinOp {
   constructor(left, right) {
      this.left = left;
      this.right = right;
   }
   toString() {
      return `(${this.left} ${this.__proto__.constructor.name} ${this.right})`;
   }
}

class LeftAssociative extends BinOp {
   constructor(left, right) {
      super(left, right);
      const thisClass = this.__proto__.constructor;
      if (right instanceof thisClass) {
         this.left = new thisClass(left, right.left);
         this.right = right.right;
      }
   }
}

class Add extends LeftAssociative {
   constructor(left, right) {
      super(left, right);
   }
}

class Sub extends LeftAssociative {
   constructor(left, right) {
      super(left, right);
   }
}

class Mul extends LeftAssociative {
   constructor(left, right) {
      super(left, right);
   }
}

class Exp extends BinOp {
   constructor(left, right) {
      super(left, right);
   }
}

class Id {
   constructor(name) {
      this.name = name;
   }
   toString() {
      return `#${this.name}`;
   }
}

class ParseResult {
   constructor(node, rest) {
      this.node = node;
      this.rest = rest;
   }
}

function term(s) {
   let left;
   [left, s] = factor(s);
   if (s[0] === "+") {
      s = s.slice(1);
      let right;
      [right, s] = term(s);
      return [new Add(left, right), s];
   }

   if (s[0] === "-") {
      s = s.slice(1);
      let right = term(s);
      return [new Sub(left, right), s];
   }

   return [left, s];
}

function factor(s) {
   console.log("factor", s);
   let left;
   [left, s] = power(s);

   if (s[0] === "*") {
      s = s.slice(1);
      let right;
      [right, s] = power(s);
      return [new Mul(left, right), s];
   }

   return [left, s];
}

function power(s) {
   console.log("power", s);
   let left;
   [left, s] = id(s);

   if (s[0] === "^") {
      s = s.slice(1);
      let right;
      [right, s] = power(s);
      return [new Exp(left, right), s];
   }

   return [left, s];
}

function id(s) {
   let out = "";
   while (s && /[A-Za-z]/.test(s[0])) {
      out += s[0];
      s = s.slice(1);
   }
   return [new Id(out), s];
}

function parse(s) {
   const [res] = term(s);
   process.stdout.write("" + res);
}

parse("a+b^c^d+e+f+g");
