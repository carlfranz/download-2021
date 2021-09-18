const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const Store = require('electron-store');
const store = new Store();

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('webapp/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('store-data', (ev, request) => {
    store.set('weeks',request.payload);
    const saved = store.get('weeks',request.payload)
    ev.sender.send(request.response, { data: saved });
  })

  ipcMain.on('retrieve-data', (ev, request) => {
    const retrieved = store.get('weeks',request.payload);
    ev.sender.send(request.response, { data: retrieved })
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
