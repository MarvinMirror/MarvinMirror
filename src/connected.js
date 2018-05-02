/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Kyle Murray                **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var manageDOM = require("../src/manageDOM");

setInterval(() => {
	checkWifi(connectionCallback);
}, 60000);

function checkWifi(cb) {
	require("dns").lookup("google.com",function(err) {
		if (err && err.code == "ENOTFOUND") {
			cb(false);
		} else {
			cb(true);
		}
	});
}

var connectionCallback = (isConnected) => {
	if (isConnected) {
		if (document.getElementById("wifi-err")) {
			manageDOM.delPopup("wifi-err");
			manageDOM.delPopup();
			manageDOM.clearContent();
		}
	} else {
		if (!document.getElementById("wifi-err")) {
			manageDOM.wifiDown();

			let wifiErr = document.getElementById("wifi-err");
			let wifiMessage = document.createElement("div");
			wifiMessage.id = "wifi-message";
			wifiMessage.className = "wifi-message bottom-div";
			wifiMessage.innerHTML = 
                "Marvin is experiencing network connectivity issues and \
                is temporarily just a mirror.\
                <br>Sorry for the convenience.";
			wifiErr.appendChild(wifiMessage);
		}
	}
};