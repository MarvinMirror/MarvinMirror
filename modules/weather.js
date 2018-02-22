var getJSON = require("../src/getJSON");
var config = require("../config/config.js");
var manageDOM = require("../src/manageDOM");

// If user did not specify location the function returns default location from config file.
function getLocation(place)
{
	if (!place) return (config.location);
	return (place);
}

// If user did not specify units the function returns default 'imperial' units (fahrenheit) from config file.
function getUnits(units)
{
	if (!units || units === "Fahrenheit") return (config.units);
	return("metric");
}

/*	Marvin function that grabs weather-by-location information from 
	the openweathermap.org API, parses and displays in the app window */
function getWeatherAtLocation(get_place, get_units) {

	// check input
	var place = getLocation(get_place);

	// check input for units
	var units = getUnits(get_units);
	// clear page
	manageDOM.clearContent("content");

	// getting data from config
	var currentWeather = config.currentWeather;

	// array of elements for builing new html
	var elements = [
		"weather-wrapper center-div", "wl_location", "wl_img_wrap", "wl_cur_temp", "wl_conditions"
	];

	// creating new html
	manageDOM.array2Div(elements, "popup");

	var wl_icon = document.createElement("img");
	wl_icon.id = "wlicon";

	var deg = units === "metric" ? "C" : "F";

	document.getElementById("wl_img_wrap").appendChild(wl_icon);

	// making url for request to weather api
	var weatherAPI =
	config.openWeatherMapAPI + "weather?q=" +
	place + "&units=" + units + "&APPID=" + currentWeather.appKey;

	// request to the API and filling html
	getJSON(weatherAPI, function(err, data){
		if (err) throw err;
		else {
			console.log(data);
			var weather = data.weather[0];
			var icon = weather.icon;
			wl_icon.setAttribute("src", "../img/weather/" + icon + ".png");
			document.getElementById("wl_cur_temp").innerHTML = Math.floor(data.main.temp) + "\
																&deg" + deg;
			document.getElementById("wl_conditions").innerHTML = weather.main;
			document.getElementById("wl_location").innerHTML = data.name;
		}
	});
}

module.exports = getWeatherAtLocation;