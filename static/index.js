const attributionContents = `
        <a id="tw-icon" href="https://tailwindcss.com/"
          ><img src="static/tailwindcss-icon.svg"
        /></a>


        <a href="https://github.com/ekelen/tailwind2-colors/" id="gh-icon"><img src="static/github-iconmonstr.svg"></a>
      `;

const createColorRows = (containerEl, colors, colorCreator) => {
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
    block
      .querySelectorAll(".label")
      .forEach((el) =>
        el.setAttribute("data-clipboard-text", formats[el.dataset.format])
      );
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

window.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector("main");
  const { colors, colorCreator } = globalThis;
  if (!colors || !colorCreator) {
    containerEl.textContent = "Hmm, we can't find the right JS files. ☹️";
    return;
  }
  if (!"content" in document.createElement("template")) {
    containerEl.textContent = "Your browser doesn't support HTML templates. ☹️";
    return;
  }

  createColorRows(containerEl, colors, colorCreator);
  const clipboard = new ClipboardJS(".label");
  clipboard.on("success", function (e) {
    e.trigger.textContent = "Copied!";
    e.trigger.classList.add("onCopy");
    window.setTimeout(() => {
      e.trigger.textContent = e.text;
      e.trigger.classList.remove("onCopy");
    }, 2000);
    e.clearSelection();
  });

  const footer = document.querySelector("footer .attr");
  footer.innerHTML = attributionContents;
  const header = document.querySelector("header .attr");
  header.innerHTML += attributionContents;
});
