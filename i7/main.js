// Into The Earth
import '../modules/proto.js';
import Maytrisk from '../modules/maytrisk.js';
import Cnavas from './Cnavas.js';

const fontSize = 20;
const cellSize = 18;
const yOffset = 10;
const defaultColor = 'white';

const del = document.documentElement;
const height = del.clientHeight;
const width = del.clientWidth;

const c = new Cnavas(document.getElementById('canvas'));
c.set.size(height, width).set.font(fontSize, true);
const m = new Maytrisk();
const applyColor = v => setFillStyleTo(colors.hasKey(v) ? typeof colors[v] === 'function' ? colors[v]() : colors[v] : defaultColor);
function drawMap() {
  // redraws entire map
  c.clear();
  m.forEach((v, x, y) => {
    applyColor(v);
    c.fillText(v, x, y);
  });
}
function drawChanges() {
  currentMap.changes.forEach((o) => {
    const { x } = o;
    const { y } = o;
    const v = currentMap.get(x, y);
    clearCell(x, y);
    applyColor(v);
    fillText(v, x, y);
  });
  currentMap.clearChanges();
}
