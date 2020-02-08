const c = document.getElementById('c');
const scale = devicePixelRatio || 1;
c.style.height = `${innerHeight}px`;
c.style.width = `${innerWidth}px`;
const width = innerWidth * scale | 0;
const height = innerHeight * scale | 0;
c.width = width;
c.height = height;
const ctx = c.getContext("2d");
const size = 4;
let x = 0;
let y = 0;
let dx = size;
let dy = size;

ctx.fillStyle = "black";
(function step() {
   if (x < 0 || x > width) {
      dx *= -1;
   }
   if (y < 0 || y > height) {
      dy *= -1;
   }
   ctx.fillRect(x += dx, y += dy, size, size);
   requestAnimationFrame(step);
})();
