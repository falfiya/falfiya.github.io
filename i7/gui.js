// import '../modules/proto.js';
import t from '../modules/t.js';
import Maytrisk from '../modules/maytrisk.js';

const box = {
  topLeft: '╓',
  topRight: '╖',
  bottomLeft: '╙',
  bottomRight: '╜',
  horizontal: '─',
  vertical: '║',
  connectorTop: '╥',
  connectorBottom: '╨',
  connectorLeft: '╟',
  connectorRight: '╢',
};
const checkTypes = t('createGUI', 'positiveInteger', 'positiveInteger');
export default function createGUI(cellCountX, cellCountY) {
  checkTypes(cellCountX, cellCountY);
  const boundX = cellCountX - 1;
  const boundY = cellCountY - 1;
  const footerSpace = 1; // minimum 1
  const footerY = boundY - 2 - footerSpace;
  /*
  ╓─────────────────╥─╖ boundX
  ║      content    ║ ║
  ║                 ║ ║
  ║                 ║ ║
  ║                 ║ ║
  ║                 ║ ║
  ╟─────────────────╨─╢ footerY
  ║    footer/data    ║
  ╙───────────────────╜
  boundY
  */
  const a = [];
  const hline = (cellCountX - 2).times(() => box.horizontal);
  a[0] = hline.copy();
  a[0].unshift(box.topLeft);
  a[0].push(box.topRight);
  a[0][boundX - 2] = box.connectorTop;
  a[footerY] = hline.copy();
  a[footerY].unshift(box.connectorLeft);
  a[footerY].push(box.connectorRight);
  a[footerY][boundX - 2] = box.connectorBottom;
  a[boundY] = hline.copy();
  a[boundY].unshift(box.bottomLeft);
  a[boundY].push(box.bottomRight);
  const m = new Maytrisk(a);
  const vert = (y) => {
    m.set(0, y, box.vertical);
    m.set(boundX, y, box.vertical);
  };
  (footerY - 1).times((i) => { vert(i + 1); m.set(boundX - 2, i + 1, box.vertical); });
  (footerSpace + 1).times(i => vert(i + footerY + 1));
  return m;
}
