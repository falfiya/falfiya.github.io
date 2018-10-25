const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
// turn off anti-aliasing
let cheight;
let cwidth;
function mut_setSize() {
  canvas.width = cwidth = screen.availWidth;
  canvas.height = cheight = screen.availHeight;
}
mut_setSize();
window.addEventListener('resize', mut_setSize);
