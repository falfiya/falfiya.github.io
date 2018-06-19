class Type extends Array {
  constructor(type) {
    super();
    this.type = type;
  }
}
class Program extends Type {
  constructor() {
    super('Program');
  }
}
class Expression extends Type {
  constructor() {
    super('Expression');
  }
}
class FunctionDeclaration extends Type {

}
class Operator extends Type {
  constructor(chrs, left, right) {
    super('Operator');
    this.chrs = chrs;
    this.left = left
    this.right = right;
  }
}
class Literal extends Expression {
}

class VariableLiteral extends Literal {
  constructor(name) {
    super();
  }
}
class FunctionLiteral extends Literal {
  constructor(name, args, codeBlock) {-

  }
}
