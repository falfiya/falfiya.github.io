import * as view from "./view.js";
import * as model from "./model.js";

view.init();
window.addEventListener("resize", view.init);

Object.assign(window, model); // oof
model.init(100, 50, 4);

function go() {
  model.add(50, 25, 1);
  model.step();
  view.drawGrains(model.whatChanged());
}
var i;
document.onclick = () => i = i ? (clearInterval(i), null) : setInterval(go, 1);
