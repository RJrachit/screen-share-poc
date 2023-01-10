const { rejects } = require('assert');
const { app, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  const {screen, desktopCapturer, webContents} = require('electron');
  console.log(screen.getAllDisplays());
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    for (const source of sources) {
      console.log(source);
    }
  })
  

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.loadURL('https://doselect.com/');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.setContentProtection(true);
  const secondaryWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  secondaryWindow.loadFile(path.join(__dirname, 'index.html'));

  ipcMain.handle('btn-click', (event, title) => {
    // const webContents = event.sender
    console.log(title,33333333);
    return new Promise((resolve, reject) => {
      let screens = "";
      desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        for (const source of sources) {
          screens = screens + "\n" + source.name;
        }
        resolve(screens);
      })
    });
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
