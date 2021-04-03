window.addEventListener("DOMContentLoaded", () => {
  const containerEl = document.querySelector("#container");
  const { colors, colorCreator } = globalThis;
  if (!colors || !colorCreator) {
    containerEl.textContent = "Hmm, we can't find the right JS files.";
  }
  Object.keys(colors).forEach((baseColorName) => {
    containerEl.innerHTML += baseColorName;
  });
});
