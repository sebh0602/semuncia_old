const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  win = new BrowserWindow({ show: false, icon: __dirname + "/images/logo_16x16.png" });

  win.maximize();

  win.loadFile("index.html");

  win.once('ready-to-show', () => {
    win.show()
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
