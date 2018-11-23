/*
*/
class TileObj {
  constructor(name = 'tile', color = 'red') {
    this.name = name;
    this.color = color;
    this.pNoMove = false;
  }
}
const P_NoMove = 1;
const tiles = {
  '.': {
    color: 'grey',
  },
};

export default tiles;
Tile('floor');
