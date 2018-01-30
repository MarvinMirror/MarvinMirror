
// Modules
const {BrowserWindow} = require('electron')
var CronJob = require('cron').CronJob;
var moment = require('moment');
var Models = require('./src/mongoDB').Models;
var updateTest = require('./src/card_reader').updateTest;
var menuUpdateMongo = require('./modules/cantina');

var Test = Models.Test;

// Config data
var windowSize = require('./config/config').window


// Schedule daily tasks
// var jobDB = new CronJob ('*/20 * * * * *', () => { console.log(moment().format('h:mm:ss a')) }
//   , null, true, 'America/Los_Angeles');

// jobDB.stop();

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
