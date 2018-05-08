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

var getJSON = require("../src/getJSON");
var promiseJSON = getJSON.promiseJSON;
var config = require("../config/config.js");
var manageDOM = require("../src/manageDOM");
var tz = require("../src/timezone");
var marvinReacts = require("../src/controller");
var sendMessage = marvinReacts.message;

/*	Marvin function that grabs weather-by-location information from 
the openweathermap.org API, parses and displays in the app window */
function getWeatherAtLocation(get_place, get_units) {
	
	// check input
	var place = (get_place) && (get_place !== "weather")  && (get_place !== "weather like") ? get_place : config.location;

	// check input for units
	var units = (!get_units || get_units === "Fahrenheit") ? config.units : "metric";

	// array of elements for builing new html
	var elements = [
		"weather-wrapper center-div", "wl_location", "wl_img_wrap", "wl_cur_temp", "wl_conditions"
	];

	var deg = units === "metric" ? "C" : "F";

	marvinReacts.process_gif();

	tz.getTimeOffset(place).then( tzData => {
		var latLonAPI = config.openWeatherMapAPI +
			"weather?lat=" + tzData.lat + "&lon=" + tzData.lng +
			"&units=" + units + "&APPID=" + process.env.MARVIN_WEATHER;
		return latLonAPI;
	})
		.then(promiseJSON)
		.then( (data) => {
			if (data.statusCode === 401) {
				sendMessage("Marvin was unable to find weather information for \"" + place.toUpperCase() + "\"");
			}
			else {
			// creating new html
				manageDOM.array2Div(elements);

				var wl_icon = document.createElement("img");
				wl_icon.id = "wlicon";
				document.getElementById("wl_img_wrap").appendChild(wl_icon);
				var weather = data.weather[0];
				var icon = weather.icon;
				wl_icon.setAttribute("src", "../img/weather/" + icon + ".png");
				document.getElementById("wl_cur_temp").innerHTML = Math.floor(data.main.temp) + "\
																&deg" + deg;
				document.getElementById("wl_conditions").innerHTML = weather.main;
				document.getElementById("wl_location").innerHTML = data.name;
			}
		})
		.catch( () => {
			sendMessage("Marvin is unable to locate weather data for \"" + place.toUpperCase() + "\"");
		});
}

module.exports = getWeatherAtLocation;