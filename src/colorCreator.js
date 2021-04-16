// const convert = require("color-convert");
const colorList = require("./colors").default;
const convert = require("./colorConvert.js").default;
const { HSLToHex, HSLToRGB } = convert;

const L_DARK = 12;
const L_LIGHT = 88;
const L_MID = 50;

const mapToHslStr = function (h, s, l) {
  return [h, s + "%", l + "%"];
};

function colorCreator({ twBaseName, twLightness }) {
  const A = 1;
  const [h, s, l] = colorList[twBaseName][twLightness]
    .split(",")
    .map((v) => +v);
  const [r, g, b] = HSLToRGB(h, s, l);

  this.raw = { h, s, l, r, g, b };
  this.cssVals = {
    hsl: `hsl(${mapToHslStr(h, s, l)})`,
    hsla: `hsla(${mapToHslStr(h, s, l, A)})`,
    rgb: `rgb(${[r, g, b]})`,
    rgba: `rgba(${[r, g, b, A]})`,
    maxContrastColor: `hsl(${mapToHslStr(h, s, l < L_MID ? L_LIGHT : L_DARK)})`,
    hex: HSLToHex(h, s, l),
  };
  this.tw = { twBaseName, twLightness, twName: `${twBaseName}-${twLightness}` };
}

globalThis.colorList = colorList;
globalThis.colorCreator = colorCreator;
