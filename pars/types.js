class Type extends Array {
  constructor(type) {
    this.type = type;
  }
}
class Program extends Type {
  constructor() {
    super('Program');
  }
}
class FunctionDeclaration extends Type {

}
