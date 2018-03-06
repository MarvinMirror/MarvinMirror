var moment = require("moment-timezone");

var getJSON = require("../src/getJSON");
var config = require("../config/config");
var manageDOM = require("../src/manageDOM");
var tz = require("../src/timezone");

// If user did not specify location the function returns default location from config file.
function getLocation(place, wikisearch) {
	if (!place && !wikisearch) return (config.location);
	return ((place) ? place : wikisearch);
}

// If user did not specify units the function returns default 'imperial' units (fahrenheit) from config file.
function getUnits(units) {
	if (!units || units === "fahrenheit") return (config.units);
	return("metric");
}

function weatherForecast(get_place, get_units) {

	// check input
	var place = getLocation(get_place);
	
	// check input for units
	var units = getUnits(get_units);
	// clear page
	var deg = units === "metric" ? "C" : "F";

	// getting data from config
	var weatherKey = config.weather;

	// array of elements for builing new html
	var elements = [
		"forecast-wrapper center-div", "fore_location", "day00", "day01", "day02",
		"day03", "day04"
	];

	// creating new html
	manageDOM.array2Div(elements, "popup");

	// making url for request to weather api
	var weatherAPI =
		config.openWeatherMapAPI + "forecast?q=" +
		place.toUpperCase() + "&units=" + units + "&APPID=" + weatherKey.appKey;

	// request to the API and filling html
	getJSON(weatherAPI, function(err, data){
		if (err) throw err;
		let j = 2;

		/*	Get the promise return of an integer for the gmt offset for the desired location 
			and pass that to a function to isolate the weather objects that occur between 13:00 and 
			16:00 in the desired location's timezone */
		tz.getTimeOffset(get_place).then( (offset) => {
			// Loop through all 40 objects in the list and get attributes for 5 days at 1:00 pm PST
			for (let i = 1; i < data.list.length; i++){
				let weather = data.list[i];
				let timestamp = moment(weather.dt * 1000 + (7 + offset) * 1000 * 60 * 60).format("HH:mm");
				
				
				// This only gets an afternoon temperature for US/Pacific time
				if ("13:00" <= timestamp && timestamp < "16:00") {
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
			document.getElementById("fore_location").innerHTML = "<p>" + data.city.name + " 5-Day Forecast</p>";
		});
	});
}

module.exports = weatherForecast;