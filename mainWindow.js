
// Modules
const {BrowserWindow} = require('electron')

// Config data
var windowSize = require('./config/config').window

// BrowserWindow instance
exports.win

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    // webPreferences: {
    //   experimentalFeatures: true,
    // },
    width: windowSize.width,
    height: windowSize.height,
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
