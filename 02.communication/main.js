const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { readdir } = require('fs/promises');

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

  ipcMain.on('list-home', (ev, request) => {
    readdir(app.getPath('home')).then(directories => {
      ev.sender.send(request.response, directories)
    })
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
