const MID_COLOR_VALUE = "500";
const id = (id) => `#${id}`;
const className = (className) => `.${className}`;

const attributionContents = `
        <a id="tw-icon" href="https://tailwindcss.com/"
          ><img src="static/icon/tailwindcss-icon.svg"
        /></a>


        <a href="https://github.com/ekelen/tailwind2-colors/" id="gh-icon"><img src="static/icon/github-iconmonstr.svg"></a>
      `;

const createSwatches = () => {
  const swatchTemplate = document.querySelector("#swatchTemplate");
  const parent = document.querySelector(".nav");
  const scrollIntoViewOptions = {
    behavior: "smooth",
    block: "center",
  };

  const createSwatchLink = ({ color, rowEl }) => {
    const { tw, cssVals } = color;
    const { twLightness, twBaseName } = tw;

    if (twLightness !== MID_COLOR_VALUE) {
      return null;
    }
    const { rgb } = cssVals;
    const swatchClone = swatchTemplate.content.cloneNode(true);
    const swatch = swatchClone.querySelector(".swatch");
    swatch.style.backgroundColor = rgb;
    swatch.classList.add(twBaseName);
    swatch.setAttribute("data-base-color", twBaseName);
    swatch.addEventListener("click", () => {
      rowEl.scrollIntoView(scrollIntoViewOptions);
    });
    const el = parent.appendChild(swatchClone);
    return el;
  };

  return { createSwatchLink };
};

const createNav = () => {
  const scrollIntoViewOptions = {
    behavior: "smooth",
    block: "center",
  };
  document.querySelector(".navTo.bottom").addEventListener("click", (e) => {
    document.querySelector("footer").scrollIntoView(scrollIntoViewOptions);
  });

  document.querySelector(".navTo.top").addEventListener("click", (e) => {
    document.querySelector("header").scrollIntoView(scrollIntoViewOptions);
  });
};

const createColorRows = ({
  containerEl,
  colorList,
  colorCreator,
  createSwatchLink,
}) => {
  const blockTemplate = document.querySelector("#blockTemplate");
  const rowTemplate = document.querySelector("#rowTemplate");

  const createBlock = ({ color, rowEl }) => {
    const blockClone = blockTemplate.content.cloneNode(true);
    const block = blockClone.querySelector(".colorBlock");
    const { cssVals, tw } = color;
    const { hsl, rgb, hex, maxContrastColor } = cssVals;
    const { twName } = tw;
    const colorSynonyms = { hsl, rgb, hex, twName };

    block.style.backgroundColor = hsl;
    block.style.color = maxContrastColor;
    block.querySelectorAll(".label").forEach((labelEl) => {
      const colorModel = labelEl.getAttribute("data-color-model");
      const synonymText = colorSynonyms[colorModel];
      labelEl.textContent = synonymText;
      labelEl.setAttribute("data-clipboard-text", synonymText);
      labelEl.setAttribute("data-content", synonymText);
    });
    rowEl.appendChild(blockClone);
  };

  const createRow = (twBaseName) => {
    const rowClone = rowTemplate.content.cloneNode(true);
    const row = rowClone.querySelector(".colorRow");
    row.classList.add(twBaseName);
    const twLightnessVals = Object.keys(colorList[twBaseName]);
    twLightnessVals.forEach((twLightness) => {
      const color = new colorCreator({ twBaseName, twLightness });
      createBlock({ color, rowEl: row });
      createSwatchLink({ color, rowEl: row });
    });
    containerEl.appendChild(rowClone);
  };

  const baseColors = Object.keys(colorList);
  baseColors.forEach(createRow);
};

const initClipboard = () => {
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
};

window.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector("main");
  const { colorCreator, colorList } = globalThis;
  if (!colorList || !colorCreator) {
    containerEl.textContent = "Hmm, we can't find the right JS files. ☹️";
    return;
  }
  if (!"content" in document.createElement("template")) {
    containerEl.textContent = "Your browser doesn't support HTML templates. ☹️";
    return;
  }
  const { createSwatchLink } = createSwatches();
  createColorRows({ containerEl, colorList, colorCreator, createSwatchLink });
  initClipboard();

  const footer = document.querySelector("footer .attr");
  footer.innerHTML = attributionContents;
  const header = document.querySelector("header .attr");
  header.innerHTML += attributionContents;

  createNav();
});
