
// Modules
const {app} = require('electron')
const mainWindow = require('./mainWindow')
const {spawn, exec} = require('child_process')

// Enable Electron-Reload
require('electron-reload')(__dirname)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


var kwsProcess = spawn('node', ['./src/voice_main.js'], { detached: false })
// Handel messages from node
kwsProcess.stderr.on('data', function (data) {
	var message = data.toString()
	console.error("ERROR", message.substring(4))
})
// UNCOMMENT BELOW FOR VC USE

// kwsProcess.stdout.on('data', function (data) {
//  var message = data.toString()
// 	console.log('[ ' + message + ' ]')
// 	if (message.localeCompare("What do you want from me?!")) mainWindow.win.webContents.send('active', true);
// 	if (message.includes("Marvin is listening")) mainWindow.win.webContents.send('sound', true);
// 	if (message.includes("Delete_sound_gif")) mainWindow.win.webContents.send('delete_gif', true);
// 	if (message.startsWith('{"text":')) mainWindow.win.webContents.send('todo', message);
	
// })

app.on('ready', mainWindow.createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) mainWindow.createWindow()
})
