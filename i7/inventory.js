class Item {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}
class Inventory {
  addItem(item) {
    if (!(item instanceof Item)) {
      throw TypeError('The first argumentto addItem must be an Item');
    }
  }
  generateMatrix() { 

  }
}