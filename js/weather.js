var getJSON = require('../modules/getJSON');
var config = require('../config/config.js');
var manageDOM = require('../modules/manageDOM');

// If user did not specify location the function returns default location from config file.
function getLocation(place)
{
	if (!place) return (config.location)
	return (place)
}

// If user did not specify units the function returns default 'imperial' units (fahrenheit) from config file.
function getUnits(units)
{
	if (!units || units === 'fahrenheit') return (config.units)
	return("metric")
}

function getWeather() {
	
	// check input for location
	var place = getLocation(document.getElementById('location_form').value)

	// check input for units
	var units = getUnits(document.getElementById('units_form').checked)
	
	// clear page
	manageDOM.clearContent();

	// getting data from config
	var currentWeather = config.currentWeather;

	// array of elements for builing new html
	var elements = [
		'location', 'time', 'img_wrap', 'cur_temp', 'conditions'
	];
	
	// creating new html
	manageDOM.array2Div(elements);

    var w_icon = document.createElement("img");
	w_icon.id = "wicon";
	
	document.getElementById('img_wrap').appendChild(w_icon);

	// sets styling for the content
	var css = document.getElementById('content_css');
	css.setAttribute('href', '../css/weather.css');
	
	// making url for request to weather api
	var weatherAPI = 
	config.openWeatherMapAPI + 'weather?q=' +
	place + '&units=' + units + '&APPID=' + currentWeather.appKey;

	// request to the API and filling html
	getJSON(weatherAPI, function(err, data){
		if (err) throw err;
		else {
			console.log(data);
			var weather = data.weather[0];
			// var desc = weather.description;
			var icon = weather.icon;
			w_icon.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
			document.getElementById("cur_temp").innerHTML = Math.floor(data.main.temp) + "&deg";
			document.getElementById("conditions").innerHTML = weather.main;
			document.getElementById("location").innerHTML = data.name;
	
		}
	});
}