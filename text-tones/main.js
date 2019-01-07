// CONFIG
const fontSize = 16;
const inBlockSize = 10;
const outBlockSize = 20;

const c = document.getElementById("c");
const ctx = c.getContext("2d");
const img = document.getElementById("img");

ctx.font = `${fontSize}px Times`;
function settings() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
function slowLoop(fn, times) {
  let i = 0;
  const interval = setInterval(() => {
    fn(i);
    if (++i >= times) {
      clearInterval(interval);
      return;
    }
  }, 1000);
}
function slowForEach(ary, fn) {
  slowLoop(i => {
    fn(ary[i], i, ary);
  }, ary.length);
}
const chars = Array(26).fill(0).map((_, i) => String.fromCodePoint(i + 65));
const fillCount = {};
class Pixels {
  constructor(uI8ca) {
    this.avg = [0, 0, 0];
    this.min = 
    uI8ca.forEach();
  }
}
function init() {
  // ctx.drawImage(img, 0, 0);
  settings();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 1000, 100);
  slowForEach(chars, char => {
    console.log(char);
    ctx.clearRect(0, 0, outBlockSize, outBlockSize);
    ctx.fillText(char, 10, 10);

  });
}

document.addEventListener("readystatechange", init);
window.addEventListener("resize", settings);
