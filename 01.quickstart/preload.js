const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld("__VARIABLES_FROM_MAIN_PROCESS", {
  chrome: process.versions["chrome"],
  node: process.versions["node"],
  electron: process.versions["electron"],
});
