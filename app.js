const {
  app,
  BrowserWindow
} = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    'minHeight': 300,
    'minWidth': 500,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html');
//  mainWindow.webContents.openDevTools();

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