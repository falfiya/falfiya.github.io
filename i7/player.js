import t from '../modules/t.js';
const T = t('string');
export default class Player {
  constructor(char = '@') {
    T(char);
    this.char = char;
    this.x = 0;
    this.y = 0;
    this.health = 50;
    this.attack = 1;
    this.defense = 1;
    this.items = [];
    this.equipped = {
      head: null,
      torso: null,
      legs: null,
      feet: null,
    };
  }
  hurt(n = 1) {
    this.health -= n;
    return this;
  }
  isDead() {
    return this.health > 0;
  }
}
