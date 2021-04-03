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

colorCreator.prototype.hex = function () {
  return `#${convert.hsl.hex(this.h, this.s, this.l)}`;
};

colorCreator.prototype.hsl = function () {
  return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
};

colorCreator.prototype.rgb = function () {
  return `rgb(${convert.hsl.rgb(this.h, this.s, this.l)})`;
};

globalThis.colors = colors;
globalThis.colorCreator = colorCreator;
