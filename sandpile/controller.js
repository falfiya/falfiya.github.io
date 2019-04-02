const sandbox = {
  x: 50,
  y: 30,
};

/**
 * @param {String | Number} key
 * @param {String} color
 */
export const setColor = (key, color) => colors[key] = color;

/** @param {Number} x */
export const setGrainCountX = x => grainCount.x = x;
/** @param {Number} y */
export const setGrainCountY = y => grainCount.y = y;
