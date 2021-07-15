window.addEventListener("DOMContentLoaded", () => {
  const { chrome, node, electron } = __VARIABLES_FROM_MAIN_PROCESS;
  document.getElementById("node-version").innerText = node;
  document.getElementById("chrome-version").innerText = chrome;
  document.getElementById("electron-version").innerText = electron;
});

document.getElementById("my-button").addEventListener("click", () => {
  const { send, once } = __COMMUNICATION_WITH_MAIN_PROCESS;

  const response = `response-${Math.ceil(Math.random() * 1000)}`;
  once(response, (_, response) => {
    console.log(response);
  });
  send("list-home", { payload: "", response });
});
