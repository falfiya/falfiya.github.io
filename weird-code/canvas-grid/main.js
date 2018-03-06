function convertToArray(a) {
  return Array.isArray(a) ? a : [];
}
class Coords {
  constructor(x, y) {
    Object.assign(this, {
      x,
      y,
    });
  }
  string() {
    return `(${[this.x, this.y].join(',')})`;
  }
}
Object.assign(Coords, {
  from(str) {
    const a = str.slice(1, -1).split(',');
    return new Coords(+a[0], +a[1]);
  },
});
class GridNode {
  constructor(x, y) {
    this.coords = new Coords(x, y);
    this.type = new.target.name;
  }
}
class GridRectangle extends GridNode {
  constructor(x, y, width, height, color) {
    super(x, y);
    Object.assign(this, {
      height,
      width,
      color,
    });
  }
  [Symbol.iterator]() {
    const coords = this.coords;
    let rectangleX = 0;
    let rectangleY = 0;
    const upperThis = this;
    const width = this.width;
    const height = this.height;
    return {
      next() {
        if (rectangleX > width - 1) {
          rectangleX = 0;
          if (++rectangleY > height - 1) {
            return {
              done: true,
            };
          }
        }
        return {
          value: new Coords(rectangleX++ + coords.x, rectangleY + coords.y),
          done: false,
        };
      },
    };
  }
}
class GridPixel extends GridNode {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }
}
class GridText extends GridNode {
  constructor(x, y, text, color) {
    super(x, y);
    Object.assign(this, {
      height,
      width,
      text,
      color,
    });
  }
}
class CanvasGrid {
  constructor(width, height, background = 'black', developmentMode = true, keepCache = true) {
    Object.assign(this, {
      width,
      height,
      background,
      developmentMode,
      keepCache,
      map: new Map(),
      changed: [],
    });
  }
  clearCashe() {
    this.map = new Map();
  }
  blank() {
    const backgroundRect = new GridRectangle(0, 0, this.width, this.height, this.background);
    this.add(backgroundRect);
  }
  change(key) {
    this.changed.push(key);
  }
  getCoords(coords) {
    return this.map.get(coords.string());
  }
  setCoords(coords, value) {
    return this.map.set(coords.string(), value);
  }
  setCoordsOf(obj) {
    return this.map.set(obj.coords.string(), obj);
  }
  add(something) {
    return this[`add${something.type}`](something);
  }
  addGridPixel(gridPixl) {
    this.setCoordsOf(gridPixl);
    this.change(gridPixl);
  }
  addGridRectangle(gridRect) {
    if (this.developmentMode) {
      //  This places an object in every single place of where the rectangle will be.
      //  It can be useful for determining if a color is still on a map.
      //  If you don't care, set developmentMode to false to gain some performance.
      console.warn('Development Mode slows down processing');
      for (const i of gridRect) {
        this.setCoords(i, gridRect);
      }
    } else {
      this.setCoordsOf(gridRect);
    }
    this.change(gridRect);
    return this;
  }
  log() {
    const m = [];
    this.map.forEach((value, coords) => {
      const c = Coords.from(coords);
      m[c.y] = Array.isArray(m[c.y]) ? m[c.y] : [];
      m[c.y][c.x] = value;
    });
    console.table(m);
  }
  requestChanges() {
    this.clearCashe();
    return this.changed;
  }
}
/*
let canvasInstructions = {
    GridPixel(p) {
        return {
            order: ['color', 'draw'],
            color: {
                type: 'set',
                key: 'fillStyle',
                value: p.color
            },
            draw: {
                type: 'call',
                key: 'fillRect',
                args: [p.coords.x, p.coords.y, 1, 1]
            }
        };
    },
    GridRectangle(r) {
        return {
            order: ['color', 'fill'],
            color: {
                type: 'set',
                key: 'fillStyle',
                value: r.color
            },
            fill: {
                type: 'call',
                key: 'fillRect',
                args: [t.coords.x, t.coords.y, t.width, t.height]
            }
        };
    },
    GridText(t) {
        return {
            order: ['color', 'fill'],
            color: {
                type: 'set',
                key: 'fillStyle',
                value: t.color
            },
            fill: {
                type: 'call',
                key: 'fillText',
                args: [t.text, t.coords.x, t.coords.y]
            }
        };
    }
}; */
function ctxInput(ctx) {
  return function ctxProcessor(c) {
    ctx.fillStyle = c.color;
    switch (c.type) {
      case 'GridPixel':
        ctx.fillRect(c.coords.x, c.coords.y, 1, 1);
        break;
      case 'GridRectangle':
        ctx.fillRect(c.coords.x, c.coords.y, c.width, c.height);
        break;
      case 'GridText':
        ctx.fillText(c.text, c.coords.x, c.coords.y);
        break;
    }
  };
}
