const { send, once } = __COMMUNICATION_WITH_MAIN_PROCESS;

console.log('renderer');

window.addEventListener("DOMContentLoaded", () => {
  const { chrome, node, electron } = __VARIABLES_FROM_MAIN_PROCESS;
  document.getElementById("node-version").innerText = node;
  document.getElementById("chrome-version").innerText = chrome;
  document.getElementById("electron-version").innerText = electron;


  retrieveData();
});

const retrieveData = () => {
  const response = `response-${Math.ceil(Math.random() * 1000)}`;
  once(response, (_, response) => {
    console.log(response);
  });
  send("retrieve-data", { payload: {}, response });
}

document.getElementById("my-button").addEventListener("click", () => {
  const response = `response-${Math.ceil(Math.random() * 1000)}`;
  once(response, (_, response) => {
    console.log(response);
  });
  send("store-data", { payload: { foo: 'bar' }, response });  
});
