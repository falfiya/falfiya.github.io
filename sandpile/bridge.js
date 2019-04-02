import { init } from "./view.js";
import * as model from "./model.js";
import { Point } from "./structures.js";

init();
window.addEventListener("resize", init);
Object.assign(window, model); // oof
model.init(15, 15, 5);
model.addToPoint(new Point(5, 5), 5);
