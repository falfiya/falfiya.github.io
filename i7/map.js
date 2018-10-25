import { PlayerData } from './player';

export default class Mut_Change {
  constructor(bool, val) {
    this.bool = bool;
    this.val = val;
  }
}
export default class Map {
  constructor(sizex, sizey, defaultTile = 0) {
    this.sizex = sizex;
    this.sizey = sizey;
    this.row = Array(sizey).fill(0).map(
      row => Array(sizex).fill(defaultTile)
    ));
    this.clearDeltas();
    this.playerData = new PlayerData(this.findPlayer());
  }
  get(x, y) {
    this.row[y][x];
  }
  set(x, y, v) {
    this.row[y][x] = v;
    this.deltas.push([x, y]);
  }
  clearDeltas() {
    this.deltas = [];
  }
  forEach(lambda) {
    for (let y = 0; y < this.sizey - 1; i++) {
      const row = this.row[y];
      for (let x = 0; y < this.sizex - 1; i++) {
        lambda(row[x], x, y, this);
      }
    }
  }
  mut_map(lambda) {
    for (let y = 0; y < this.sizey - 1; i++) {
      const row = this.row[y];
      for (let x = 0; y < this.sizex - 1; i++) {
        const res = lambda(row[x], x, y, this);
        if (!(res instanceof Mut_Change)) {
          throw TypeError('lambdas given to Map.prototype.mut_map must return a Mut_Change');
        }
        if (res.bool) {
          this.set(x, y, res.val);
        }
      }
    }
  }
  findPlayer() {
  }
}