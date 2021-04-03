const convert = require("color-convert");
const colors = require("./colors").default;

function colorCreator(baseColorName, value) {
  const hslStr = colors[baseColorName][value];
  this.baseColorName = baseColorName;
  this.value = value;

  this.tailwindName = `${baseColorName}-${value}`;
  const [h, s, l] = hslStr.split(",").map((v) => +v);
  this.h = h;
  this.s = s;
  this.l = l;
}

colorCreator.prototype.toHex = function () {
  return convert.hex.hsl(this.h, this.s, this.l);
};

colorCreator.prototype.asHex = function () {
  return this.h;
};

globalThis.colors = colors;
globalThis.colorCreator = colorCreator;
