const { ipcMain } = require('electron')
const Store = require("electron-store");
const store = new Store();

function registerDataStore() {
  ipcMain.on("store-data", (ev, request) => {
    store.set("weeks", request.payload);
    const saved = store.get("weeks", request.payload);
    ev.sender.send(request.response, { data: saved });
  });

  ipcMain.on("retrieve-data", (ev, request) => {
    const retrieved = store.get("weeks", request.payload);
    ev.sender.send(request.response, { data: retrieved });
  });
}

exports.registerDataStore = registerDataStore;