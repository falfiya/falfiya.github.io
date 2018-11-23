class Item {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}
class Inventory {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    if (!(item instanceof Item)) {
      throw TypeError('The first argumentto addItem must be an Item');
    }
    this.items.push();
    this.items.sort();
  }
}
