/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Anastasia Zimina           **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \       Kyle Murray                **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var moment = require("moment-timezone");
var config = require("../config/config.js");
var manageDOM = require("../src/manageDOM");
var getTimeZone = require("../src/timezone").getTimeZone;

function dateLocalTime(timezone, place) {

	manageDOM.array2Div(["locale", "dateDiv"]);
        
	var contentdiv = document.getElementById("locale");
	contentdiv.className = "locale center-div";
	contentdiv.innerHTML = "Now in " + place.toUpperCase() + ":";
        
	var localTimediv = document.createElement("div");
	var hourDiv = document.createElement("div");
	var colonDiv = document.createElement("div");
	var minutesDiv = document.createElement("div");
	var dateDiv = document.createElement("div");
        
	localTimediv.className = "clock";
	hourDiv.className = "hour";
	colonDiv.className = "colon";
	minutesDiv.className = "minutes";
	dateDiv.className = "date";
        
	contentdiv.appendChild(localTimediv);
	localTimediv.appendChild(hourDiv);
	localTimediv.appendChild(colonDiv);
	localTimediv.appendChild(minutesDiv);
	contentdiv.appendChild(dateDiv);
        
	colonDiv.innerHTML = ":";
	let now = moment().tz(timezone);
	let dateString = now.format("dddd, MMMM D");
	hourDiv.innerHTML = now.format("HH");
	minutesDiv.innerHTML = now.format("mm");
	dateDiv.innerHTML = dateString;
}

var clock = {
    
	dateTime: () => {

		var clockDiv = document.getElementById("date-time");
        
		var timeDiv = document.createElement("div");
		var dateDiv = document.createElement("div");
		timeDiv.setAttribute("class", "clock");
		dateDiv.setAttribute("class", "date");
        
		var hourDiv = document.createElement("div");
		var colonDiv = document.createElement("div");
		var minutesDiv = document.createElement("div");
        
        
		hourDiv.className = "hour";
		colonDiv.className = "colon";
		minutesDiv.className = "minutes";
        
		clockDiv.append(timeDiv, dateDiv);
		timeDiv.append(hourDiv, colonDiv, minutesDiv);
        
		colonDiv.innerHTML = ":";
        
		setInterval(function getTime () {
			let now = moment();
			hourDiv.innerHTML = now.format("HH");
			minutesDiv.innerHTML = now.format("mm");
			dateDiv.innerHTML = moment().format("dddd, MMMM D");
		}, 1000);
	},

	localDateTime: (place) => {
		if (place) {
			getTimeZone(place).then( (timezoneID) => {
				dateLocalTime(timezoneID, place);
			});
		}
		else
		{
			dateLocalTime(config.timeZone, config.location);
		}
	}
};

module.exports = clock;