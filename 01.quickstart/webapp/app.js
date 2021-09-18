window.addEventListener("DOMContentLoaded", () => {
  const { chrome, node, electron } = __VARIABLES_FROM_MAIN_PROCESS;
  document.getElementById("node-version").innerText = node;
  document.getElementById("chrome-version").innerText = chrome;
  document.getElementById("electron-version").innerText = electron;
});
