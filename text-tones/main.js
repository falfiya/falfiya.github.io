// CONFIG
const fontSize = 16,
  inBlockSize = 10,
  outBlockSize = 20,

  c = document.getElementById("c"),
  ctx = c.getContext("2d"),
  img = document.getElementById("img");

ctx.font = `${fontSize}px Times`;
function settings() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
function slowLoop(fn, times) {
  let i = 0;
  const interval = setInterval(() => {
    fn(i);
    if (++i >= times) clearInterval(interval);


  }, 1000);
}
function slowForEach(ary, fn) {
  slowLoop(i => {
    fn(ary[i], i, ary);
  }, ary.length);
}
const chars = Array(26).fill(0).map((_, i) => String.fromCodePoint(i + 65)),
  fillCount = {};
class Pixels {
  constructor(uI8ca) {
    this.avg = [0, 0, 0];
    this.min
    = uI8ca.forEach();
  }
}
function init() {
  // Ctx.drawImage(img, 0, 0);
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
