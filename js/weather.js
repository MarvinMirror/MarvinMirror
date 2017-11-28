var getJSON = require('../modules/getJSON');
var config = require('../config/config');
var ftAPI = require('../modules/ftAPI');
var manageDOM = require('../modules/manageDOM');

function getWeather() {

	manageDOM.clearContent();

	var currentWeather = config.currentWeather;
	var elements = [
		'location', 'img_wrap', 'cur_temp', 'conditions'
	];
	
	manageDOM.array2Div(elements);
    var w_icon = document.createElement("img");
	w_icon.id = "wicon";
	document.getElementById('img_wrap').appendChild(w_icon);

	// sets styling for the content
	var css = document.getElementById('content_css');
	css.setAttribute('href', '../css/weather.css');

	var weatherAPI = 
		'http://api.openweathermap.org/data/2.5/weather?q=' +
		currentWeather.location + '&units=' + currentWeather.units +
		'&APPID=' + currentWeather.appKey;

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