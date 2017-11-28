var getJSON = require('../modules/getJSON');
var config = require('../config/config');
var ftAPI = require('../modules/ftAPI');
var moment = require('moment');
var manageDOM = require('../modules/manageDOM');
var now = moment();

function weatherForecast() {

	manageDOM.clearContent();

	var weatherForecast = config.weatherForecast;
	var elements = [
		'location', 'day00', 'day01', 'day02',
		'day03', 'day04'
	];
	
	manageDOM.array2Div(elements);
	
	// sets styling for the content
	var css = document.getElementById('content_css');
	css.setAttribute('href', '../css/forecast.css');

	var weatherAPI = 
		'http://api.openweathermap.org/data/2.5/forecast?q=' +
		weatherForecast.location + '&units=' + weatherForecast.units + '&APPID=' + weatherForecast.appKey;

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
				d.class = "daycast";
				// var date = document.createElement("div");
				var day = document.createElement("div");
				var temp = document.createElement("div");
				var img = document.createElement("div");
				var w_icon = document.createElement("img");
				var icon = data.list[4 + (i - 1) * 8].weather[0].icon;
				img.appendChild(w_icon);
				// date.class = "date";
				// time = now.add(i - 1, 'days');
				// date.innerHTML = time;
				day.class = "day";
				day.innerHTML = now.add(i - 1, 'days').format("ddd, M/D");
				temp.class = "temp";
				temp.innerHTML = Math.floor(data.list[4 + (i - 1) * 8].main.temp);
				img.class = "img";
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