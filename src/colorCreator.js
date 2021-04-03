const convert = require("color-convert");
const colors = require("./colors").default;

function colorCreator(baseColorName, value) {
  this.hslValueArray = colors[baseColorName][value].split(",").map((v) => +v);
  this.baseColorName = baseColorName;
  this.value = value;

  this.tailwindName = `${baseColorName}-${value}`;

  const [h, s, l] = this.hslValueArray;
  this.h = h;
  this.s = s;
  this.l = l;
}

colorCreator.prototype.mapToHslArgs = function (
  h = this.h,
  s = this.s,
  l = this.l
) {
  return [h, s + "%", l + "%"];
};

colorCreator.prototype.hex = function () {
  return `#${convert.hsl.hex(this.hslValueArray)}`;
};

colorCreator.prototype.hsl = function () {
  return `hsl(${this.mapToHslArgs()})`;
};

colorCreator.prototype.rgb = function () {
  return `rgb(${convert.hsl.rgb(this.hslValueArray)})`;
};

colorCreator.prototype.muchContrast = function () {
  const lightness = this.l <= 50 ? 88 : 12;
  return `hsl(${this.mapToHslArgs(this.h, this.s, lightness)})`;
};

colorCreator.prototype.allFormats = function () {
  return {
    hex: this.hex(),
    rgb: this.rgb(),
    hsl: this.hsl(),
    tailwindName: this.tailwindName,
  };
};

globalThis.colors = colors;
globalThis.colorCreator = colorCreator;
