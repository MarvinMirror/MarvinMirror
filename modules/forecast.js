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
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \       Anastasia Zimina           **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var moment = require("moment-timezone");
var getJSON = require("../src/getJSON");
var promiseJSON = getJSON.promiseJSON;
var config = require("../config/config");
var manageDOM = require("../src/manageDOM");
var tz = require("../src/timezone");
var marvinReacts = require("../src/controller");
var sendMessage = marvinReacts.message;

// If user did not specify units the function returns default 'imperial' units (fahrenheit) from config file.
function getUnits(units) {
	if (!units || units === "fahrenheit") return (config.units);
	return("metric");
}

function weatherForecast(get_place, get_units) {

	// check input
	var place = (get_place) && (get_place !== "forecast") ? get_place : config.location;
	
	// check input for units
	var units = getUnits(get_units);
	// clear page
	var deg = units === "metric" ? "C" : "F";

	marvinReacts.process_gif();

	// array of elements for builing new html
	var elements = [
		"forecast-wrapper center-div", "fore_location", "day00", "day01", "day02",
		"day03", "day04"
	];

	/*	A series of promises to get city latitude and longitude for accuracy,
		query weather API for forecast data, get timezone offset so get daytime
		forecasts, and then fill html */
	tz.getTimeOffset(place).then( tzData => {
			var latLonAPI = config.openWeatherMapAPI +
				"forecast?lat=" + tzData.lat + "&lon=" + tzData.lng +
				"&units=" + units + "&APPID=" + process.env.MARVIN_WEATHER;
			return latLonAPI;
			})
		.then(promiseJSON)
		.then( (data) => {
			if (data.statusCode === 401) {
				sendMessage("Marvin was unable to find weather information for \"" + place.toUpperCase() + "\"");
			}
			else {

				let j = 2;
	
				/*	Get the promise return of an integer for the gmt offset for the desired location 
					and pass that to a function to isolate the weather objects that occur between 13:00 and 
					16:00 in the desired location's timezone */
				tz.getTimeOffset(place).then( (tzData) => {	
					// creating new html
					manageDOM.array2Div(elements);
					let offset = tzData.gmtOffset;
					let count = 0;
					// Loop through all 40 objects in the list and get attributes for 5 days at 1:00 pm PST
					for (let i = 1; i < data.list.length; i++){
						let weather = data.list[i];
						let timestamp = moment(weather.dt * 1000 + (7 + offset) * 1000 * 60 * 60).format("HH:mm");
						
						
						// This only gets an afternoon temperature for US/Pacific time
						if ("13:00" <= timestamp && timestamp < "16:00") {
							count++;
							var wrap = document.createDocumentFragment();
	
							var d = document.getElementById(elements[j]);
							d.setAttribute("class", "daycast daycast--" + (j - 2));
	
							var day = document.createElement("div");
							day.setAttribute("class", "fore_day");
							day.innerHTML = "<p>" + moment(weather.dt * 1000).format("ddd") + "</p>";
	
							var temp = document.createElement("div");
							temp.setAttribute("class", "fore_temp");
							temp.innerHTML = "<p>" + Math.floor(weather.main.temp) + "&deg" + deg + "</p>";
	
							var img = document.createElement("div");
							img.setAttribute("class", "fore_img");
	
							var w_icon = document.createElement("img");
							var icon = weather.weather[0].icon;
							w_icon.setAttribute("src", "../img/weather/" + icon + ".png")
	
							img.appendChild(w_icon);
							wrap.appendChild(day);
							wrap.appendChild(temp);
							wrap.appendChild(img);
							d.appendChild(wrap);
							j++;
						}
					}
					document.getElementById("fore_location").innerHTML = "<p>" + data.city.name + " " + count +"-Day Forecast</p>";
				});
			}
		})
		.catch( () => {
			sendMessage("Marvin is unable to locate forecast data for \"" + place.toUpperCase() + "\"");
		});
}

module.exports = weatherForecast;