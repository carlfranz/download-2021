const { app, BrowserWindow } = require('electron');
const dataStore = require('./data-store');
const path = require('path');
var addon = require('bindings')('hello');

console.log(addon.hello(40)); // 'world'

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  dataStore.registerDataStore();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  mainWindow.webContents.openDevTools();
};

app.on('ready',createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { 
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)  { 
    createWindow(); 
  }
});
