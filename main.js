
// Modules
const {spawn, exec} = require("child_process");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Enable Electron-Reload
require("electron-reload")(__dirname);
// Access node env variables
require("dotenv").load();

let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		frame: false,
		fullscreen: true,
		backgroundColor: "#000"
	});

	// and load the index.html of the app.
	mainWindow.loadURL("file://" + __dirname + "/renderer/index.html");
  
	// Emitted when the window is closed.
	mainWindow.on("closed", function () {
	  // Dereference the window object, usually you would store windows
	  // in an array if your app supports multi windows, this is the time
	  // when you should delete the corresponding element.
	  mainWindow = null;
	});
}

var kwsProcess = spawn("node", ["./src/voice_main.js"], { detached: false });
// Handel messages from node
kwsProcess.stderr.on("data", function (data) {
	var message = data.toString();
	console.error("ERROR", message.substring(4));
});

// UNCOMMENT BELOW FOR VC USE

kwsProcess.stdout.on("data", function (data) {
	var message = data.toString();
	console.log("[ " + message + " ]");
	if (message.localeCompare("What do you want from me?!")) mainWindow.webContents.send("active", true);
	if (message.includes("Marvin is listening")) mainWindow.webContents.send("sound", true);
	if (message.includes("Delete_sound_gif")) mainWindow.webContents.send("delete_gif", true);
	if (message.startsWith("{\"text\":")) mainWindow.webContents.send("todo", message);
	
});

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
	  createWindow();
	}
});
