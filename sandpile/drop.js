// const dropPattern = Array(~~(width() / size)).fill([1000]);
let XX = 0;
function drop() {
  if (!XX) {
    XX = 1;
    dropp({
      'c0, c0': 100,
      'a100, c0': 999,
      'c100, a100': 100,
    });
  }
}
