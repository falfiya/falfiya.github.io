class Description {
  constructor(type, description, staff) {
    this.type = type || '';
    this.staff = staff;
    this.description = description || '';
  }
  write() {
    if (this.type) {
      info.typel.style.display = 'inline';
    }
    info.type.innerHTML = this.type;
    if (this.staff) {
      info.staffl.style.display = 'inline';
      info.staff.innerHTML = this.staff.join(', ');
    }
    info.description.innerHTML = this.description;
  }
}

class Area {
  constructor(id) {
    console.log(id);
    const elem = mapDOM.getElementById(id);
    const child = elem.childNodes[0];
    elem.onclick = _ => this.click;
    elem.onmouseenter = _ => this.mouseenter();
    elem.onmouseleave = _ => this.mouseleave();
    child.Area = this;
    child.setAttribute('onclick', 'this.Area.click();');
    this.id = id;
    this.info = areaInfo[id] || new Description();
    this.opacityDivisor = 2;
    this.elem = elem;
    this.child = child;
    this.originalOpacity = child.getAttribute('fill-opacity') || 1;
    this.dim();
  }
  activate() {
    if (active) {
      active.deactivate();
    }
    active = this;
    info.title.innerHTML = this.id;
    this.info.write();
    this.activateActions();
  }
  activateActions() {
    this.resetOpacity();
  }
  deactivate() {
    active = null;
    this.deactivateActions();
  }
  deactivateActions() {
    if (active !== this) {
      this.dim();
    }
  }
  click() {
    console.log('Activated');
    this.activate();
  }
  mouseenter() {
    this.activateActions();
  }
  mouseleave() {
    this.deactivateActions();
  }
  dim() {
    this.setOpacity(this.originalOpacity / this.opacityDivisor);
  }
  resetOpacity() {
    this.setOpacity(this.originalOpacity);
  }
  setOpacity(val) {
    this.child.setAttribute('fill-opacity', val);
  }
}
const areas = [
  '1A', '1B', '1C', '1D', '1E',
  '2A', '2B', '2C', '2D', '2E',
  103, 105, 106, 108, 114, 120, 127, 129, 130, 132,
  203, 205, 206, 208, 214, 220, 227, 229, 230, 232,
];
const easterEggs = {};
const areaInfo = {
  '1A': new Description('Breakout Space', "Unspirited warning: Melissa's @dtech ahead"),
  '1B': new Description('Breakout Space', "Christy's @dtech; Knott a bad place to hang out"),
  '1C': new Description('Reception Hall'),
  '1D': new Description('Breakout Space', 'A place for Mr. Wilgus and Ms. Hu to send their students'),
  '1E': new Description('Breakout Space', "Dr. Little's @dtech"),
  '2A': new Description('Breakout Space', "Nicole's @dtech"),
  '2B': new Description('Breakout Space', 'A place for Mr. Sullivan and Ms. Gonzales to send their students'),
  '2C': new Description('Breakout Space', "Breakout area for Addicott's room"),
  '2D': new Description('Breakout Space', "Bolt's @dtech and breakout space for Wall and Groat"),
  '2E': new Description('Breakout Space', "Dr. Montgomery's @dtech is here"),
  103: new Description('Classroom', 'One does not simply walk into Morodor', ['Morodor']),
  105: new Description('Classroom', 0, ['Pineda']),
  106: new Description('Classroom', 0, ['Bolt', 'Stamper']),
  108: new Description('Classroom', "This room is also home to Skyline classes and O'dell's @dtech", ['Siegman', "O'dell"]),
  114: new Description('DRG', "It's the Design Realization Garage! This one's the first floor", ['McAndrew', 'Brock']),
  120: new Description('Classroom', "It's a room for Chemestry", ['Fenner', 'Fannie']),
  127: new Description('Classroom', "It's d.tech US History, dtush...", ['Wilgus']),
  129: new Description('Classroom', "Hu's classroom is this?", ['Hu']),
  130: new Description('Classroom', 0, ['Chetini']),
  132: new Description('Classroom', 0, ['Frost']),
  203: new Description('Classroom', "Mr. Lonnemann's Classroom. Also, Skyline", ['Lonnemann']),
  205: new Description('Classroom', 'Cooley Math Games', ['Cooley']),
  206: new Description('Classroom', '<span id="close-reading">Close Reading</span>', ['Sullivan']),
  208: new Description('Classroom', 0, ['Gonzales']),
  214: new Description('DRG', "It's the DRG, but upstairs. Marcus' @dtech meets here.", ['Marcus']),
  220: new Description('Classroom', 0, ['Addicot', 'Fannie']),
  227: new Description('Classroom', 'Orange everywhere!', ['Groat']),
  229: new Description('Classroom', 'Wall', ['Wall']),
  230: new Description('Classroom', 0, ['Anderson']),
  232: new Description('Classroom', 'VR the future.', ['Pierce', 'Ashley']),
};
const areaClass = {};
const info = {};
let active;
let mapDOM;
function setTime() {
  const sicWidth = getComputedStyle(document.getElementById('sic')).width.slice(0, -2);
  console.log(Math.round(sicWidth / 24));
  info.time.innerHTML = Date().split` `.slice(0, 5).join` `;
}
function main() {
  mapDOM = document.getElementById('map').contentDocument;
  ['title', 'type', 'typel', 'staff', 'staffl', 'description', 'time'].forEach((thing) => {
    info[thing] = document.getElementById(`ic${thing}`);
  });
  areas.forEach((id) => {
    areaClass[id] = new Area(id);
  });
  setInterval(setTime, 500);
  info.time.style.fontSize = Math.round(sicWidth / 16) + 'px';
  window.addEventListener('resize', () => info.time.style.fontSize = Math.round(sicWidth / 16) + 'px');
}
window.addEventListener('load', main);
