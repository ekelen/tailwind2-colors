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
    const moreContrast = color.muchContrast();

    const formats = color.allFormats();
    block.style.backgroundColor = formats.hsl;
    block.style.color = moreContrast;
    block
      .querySelectorAll(".label")
      .forEach((el) => (el.textContent = formats[el.dataset.format]));
    rowEl.appendChild(block);
  };

  const createRow = (baseColorName) => {
    const rowClone = rowTemplate.content.cloneNode(true);
    const row = rowClone.querySelector(".colorRow");
    const colorValues = Object.keys(colors[baseColorName]);
    colorValues.forEach((value) => {
      createBlock(baseColorName, row, value);
    });
    containerEl.appendChild(rowClone);
  };

  const baseColors = Object.keys(colors);
  baseColors.forEach(createRow);
};

const clickOnCopy = function (stealthInput) {
  document.querySelectorAll(".label").forEach((node) => {
    node.addEventListener("click", (e) => {
      e.preventDefault();
      stealthInput.value = e.target.textContent;
      stealthInput.focus({ preventScroll: true });
      stealthInput.select();
      document.execCommand("copy");
      e.target.textContent = "Copied!";
      window.setTimeout(
        () => (e.target.textContent = stealthInput.value),
        2000
      );
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector("#container");
  const stealthInput = document.querySelector("#stealthInput");
  const { colors, colorCreator } = globalThis;
  if (!colors || !colorCreator) {
    containerEl.textContent = "Hmm, we can't find the right JS files.";
  }
  createColorRows(containerEl, colors, colorCreator);
  clickOnCopy(stealthInput);
});
