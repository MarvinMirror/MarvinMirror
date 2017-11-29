var getJSON = require('../modules/getJSON');
var config = require('../config/config.js');
var moment = require('moment');
var manageDOM = require('../modules/manageDOM');
var now = moment();

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

function weatherForecast() {
	
	// check input for location
	var place = getLocation(document.getElementById('location_form').value)

	// check input for units
	var units = getUnits(document.getElementById('units_form').checked)
	
	// clear page
	manageDOM.clearContent();

	// getting data from config
	var weatherForecast = config.weatherForecast;

	// array of elements for builing new html
	var elements = [
		'location', 'day00', 'day01', 'day02',
		'day03', 'day04'
	];
	
	// creating new html
	manageDOM.array2Div(elements);
	
	// sets styling for the content
	var css = document.getElementById('content_css');
	css.setAttribute('href', '../css/forecast.css');

	// making url for request to weather api
	var weatherAPI = 
		config.openWeatherMapAPI + 'forecast?q=' +
		place + '&units=' + units + '&APPID=' + weatherForecast.appKey;

	// request to the API and filling html
	getJSON(weatherAPI, function(err, data){
		if (err) throw err;
		console.log(data);
		if (data === null){
			console.log("just fuck me up fam");
		}
		else {
			document.getElementById('location').innerHTML = data.city.name;
			for (i = 1; i <= 5; i++){
				var wrap = document.createDocumentFragment();
				var d = document.getElementById(elements[i]);
				d.setAttribute("class", "daycast");
				// var date = document.createElement("div");
				var day = document.createElement("div");
				var temp = document.createElement("div");
				var img = document.createElement("div");
				var w_icon = document.createElement("img");
				var icon = data.list[4 + (i - 1) * 8].weather[0].icon;
				img.appendChild(w_icon);
				// date.setAttribute("class", "date";
				// time = now.add(i - 1, 'days');
				// date.innerHTML = time;
				day.setAttribute("class", "day");
				day.innerHTML = now.add(i - 1, 'days').format("ddd, M/D");
				temp.setAttribute("class", "temp");
				temp.innerHTML = Math.floor(data.list[4 + (i - 1) * 8].main.temp);
				img.setAttribute("class", "img");
				w_icon.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png")
				// wrap.appendChild(date);
				wrap.appendChild(day);
				wrap.appendChild(temp);
				wrap.appendChild(img);
				d.appendChild(wrap);
			};
		}
	});
}