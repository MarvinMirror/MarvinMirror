
// Modules
const {BrowserWindow} = require('electron')

// BrowserWindow instance
exports.win

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    // webPreferences: {
    //   experimentalFeatures: true,
    // },
    width: 1595,
    height: 2759,
    // resizable: false,
    frame: false,
    // blinkFeatures: 'CSSGridLayout',
    backgroundColor: '#000'
  })

  // Devtools
  // this.win.webContents.openDevTools()

  // Load main window content
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })
}
