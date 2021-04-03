const createColorRows = (containerEl, colors, colorCreator) => {
  if (!"content" in document.createElement("template")) {
    console.warn("Your browser doesn't support HTML templates.");
    return null;
  }

  const blockTemplate = document.querySelector("#blockTemplate");
  const rowTemplate = document.querySelector("#rowTemplate");

  const createBlock = (baseColorName, rowEl, colorValue) => {
    const blockClone = blockTemplate.content.cloneNode(true);
    const block = blockClone.querySelector(".colorBlock");
    const color = new colorCreator(baseColorName, colorValue);
    block.style.backgroundColor = color.hex();
    rowEl.appendChild(block);
  };

  const createRow = (baseColorName) => {
    const rowClone = rowTemplate.content.cloneNode(true);
    const row = rowClone.querySelector(".colorRow");
    row.id = baseColorName;
    const colorValues = Object.keys(colors[baseColorName]);
    colorValues.forEach((value) => {
      createBlock(baseColorName, row, value);
    });
    containerEl.appendChild(rowClone);
  };

  const baseColors = Object.keys(colors);
  baseColors.forEach(createRow);
};

window.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector("#container");
  const { colors, colorCreator } = globalThis;
  if (!colors || !colorCreator) {
    containerEl.textContent = "Hmm, we can't find the right JS files.";
  }
  createColorRows(containerEl, colors, colorCreator);
});
