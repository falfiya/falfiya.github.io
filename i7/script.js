import Map from './map.js';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
// turn off anti-aliasing
const fontSize = 20;
let cheight;
let cwidth;
let charCountX;
let charCountY;
let offsetX;
function mut_canvasInit() {
  canvas.width = cwidth = screen.availWidth;
  canvas.height = cheight = screen.availHeight;
  charCountX = 0 | cwidth / fontSize;
  charCountY = 0 | cheight / fontSize;
  offsetX = Math.round((cwidth % fontSize) / 2);
  ctx.font = `${fontSize}px Consolas`;
  ctx.fillStyle = 'white';
}
mut_canvasInit();
new Map();
window.addEventListener('resize', mut_canvasInit);
