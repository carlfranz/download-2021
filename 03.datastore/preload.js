const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("__VARIABLES_FROM_MAIN_PROCESS", {
  chrome: process.versions["chrome"],
  node: process.versions["node"],
  electron: process.versions["electron"],
});


contextBridge.exposeInMainWorld('__COMMUNICATION_WITH_MAIN_PROCESS', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  once: (channel, func) => {
    ipcRenderer.once(channel, (event, response) => func(event, response));
  }
});
