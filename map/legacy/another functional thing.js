function main() {
  const getDocumentElementById = geti(document),

    areaIds = ["1A", "1B", "1C", "1D", "1E", 103, 105, 106, 108, 120],
    areaInfo = {"1A": {}},
    opacityDivisor = 2,
    areaObj = {
      onclick(e) {
        info = areaInfo[this.id];
        getElement = R.prop("target");
        element = getElement(e);
        mutElementInfo = mutate(info);
        getAttribute = R.invoker(1, "getAttribute");
        setAttribute = R.invoker(2, "setAttribute");
        getOpacity = R.pipe(getElement, getAttribute("fill-opacity"));
        setOpacity = R.pipe(getElement, setAttribute("fill-opacity"));
        if (info.selected) {
          mutElementInfo("selected", false);
        } else {
          mutElementInfo("selected", true);
          mutElementInfo("originalOpacity", getOpacity);
          setOpacity(R.divide(R.__, opacityDivisor));
        }
      },
    },

    impure = fn => (...args) => {
      fn(...args);
      return args;
    },
    mutate = impure(R.curry((obj, key, val) => object[key] = val)),
    oAssign = R.flip(R.curry(Object.assign)),
    geti = R.flip(R.invoker(1, "getElementById")),

    getContentDocument = R.prop("contentDocument"),
    getSubId = R.pipe(getDocumentElementById, getContentDocument, geti),
    getIdFromMap = getSubId("map"),
    mapFromAreaIds = R.map(R.__, areaIds),
    assignAreaObj = oAssign(areaObj),
    assignAreaObjToMapId = R.pipe(getIdFromMap, assignAreaObj);
  mapFromAreaIds(assignAreaObjToMapId);
}
window.addEventListener("load", main);
