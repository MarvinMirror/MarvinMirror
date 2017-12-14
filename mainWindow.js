
// Modules
const {BrowserWindow} = require('electron')

// Config data
var windowSize = require('./config/config').window

// BrowserWindow instance
exports.win

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    width: windowSize.width,
    height: windowSize.height,
    // x: 0,
    // y:0,
    // resizable: false,
    frame: false,
    // fullscreen: true,
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
