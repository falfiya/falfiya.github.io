function chrdm() {
  const e = endpoints[~~(Math.random() * endpoints.length)];
  return {
    x: cursor.x - ((cursor.x - e.x) / 2),
    y: cursor.y - ((cursor.y - e.y) / 2),
  };
}
function draw() {
  cursor = chrdm();
  map.add(new GridPixel(cursor.x, cursor.y, 'white'));
  map.requestChanges().forEach(ctxProc);
}
window.onload = function () {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx = c.getContext('2d');
  map = new CanvasGrid(c.width, c.height, 'black', false, false);
  map.blank();
  ctxProc = ctxInput(ctx);
  setInterval(draw, 2);
  endpoints = [
    new Coords(~~(Math.random() * c.width), ~~(Math.random() * c.height)),
    new Coords(~~(Math.random() * c.width), ~~(Math.random() * c.height)),
    new Coords(~~(Math.random() * c.width), ~~(Math.random() * c.height)),
  ];
  endpoints.forEach((_) => { map.add(new GridPixel(_.x, _.y, 'white')); });
  cursor = endpoints[0];
};
