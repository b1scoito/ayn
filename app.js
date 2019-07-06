const {
  app,
  BrowserWindow
} = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 725,
    height: 439,
    frame: false,
    'minHeight': 439,
    'minWidth': 725,
    icon: './icon.png',
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false
  })
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});