/******************************************************************************\
**  __  __          _______       _______    ___  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |    _/|_    /| |  | |  _  /       Anastasia Zimina           **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var getWeatherAtLocation = require("../modules/weather");
var weatherForecast = require("../modules/forecast");
var clock = require("../modules/clock");
var getMenu = require("../modules/cantina").getMenu;
var marvinHelp = require("../modules/help");
var authors = require("../modules/author");
var v2Users = require("../modules/student");
var v2projects = require("../modules/projects");
var wordOfADay = require("../modules/word_of_a_day");
var wikiDefinition = require("../modules/wikiDefinition");
var calendar = require("../modules/calendar");
var news = require("../modules/news");
var read_input = require("../src/get_input");
var studentOnMap = require("../modules/maps.js");
var Analytics = require("../src/mongoDB").Models.Analytics;
<<<<<<< HEAD
var send_message = require('../src/controller').message;
var photo = require('../modules/photoBooth.js');
var joke = require('../modules/joke.js');
var introduction = require('../modules/introduction.js');
=======
var send_message = require("../src/controller").message;
var photo = require("../modules/photoBooth.js");
var joke = require("../modules/joke.js");
var howAreYou = require("../modules/howAreYou");
var loadCorrections = require("../modules/corrections.js");
>>>>>>> dc376c98e0f4a3d1559a2574572cb21b28370b74


// Maybe make this a switch instead of if/else?
function command_execution (event, message) {
<<<<<<< HEAD
    var result = JSON.parse(message)
    add_analytics_data(result)
    if (result.intent === 'get_weather') getWeatherAtLocation(result.location || result.wikiword, result.units);
    else if (result.intent === 'forecast') weatherForecast(result.location || result.wikiword, result.units);
    else if (result.intent === 'local_time') clock.localDateTime(result.location);
    else if (result.intent === 'cantina_tomorrow') getMenu('tomorrow');
    else if (result.intent === 'cantina_today') getMenu('today');
    else if (result.intent === 'help') marvinHelp();
    else if (result.intent === 'photo') photo();
    else if (result.intent === 'authors') authors();
    else if (result.intent === 'word_of_the_day') wordOfADay(result.dictionary);
    else if (result.intent === 'get_student') read_input(v2Users.studentInfo);
    else if (result.intent === 'projects') read_input(v2projects.getBestProjects);
    else if (result.intent === 'corrections') read_input(loadCorrections);
    else if (result.intent === 'map') read_input(studentOnMap);
    else if (result.intent === 'events') calendar(result.period, result.date);
    else if (result.intent === 'wikiDefinition') wikiDefinition(result.wikiword);
    else if (result.intent === 'news') news();
    else if (result.intent === 'joke') joke();
	else if (result.intent === 'introduction') introduction();
    else send_message('You asked for "' + result.text + '".<br> I don\'t understand you.')
}

function add_analytics_data(result) {
    var existingFunctions = ['get_weather', 'forecast', 'local_time', 'cantina_tomorrow', 'cantina_today', 'help', 'authors',
    'word_of_the_day', 'get_student', 'projects', 'corrections', 'map', 'events', 'wikiDefinition', 'news', 'photo', 'joke', 'introduction'];
=======
	var result = JSON.parse(message);
	add_analytics_data(result);
	if (result.intent === "get_weather") getWeatherAtLocation(result.location || result.wikiword, result.units);
	else if (result.intent === "forecast") weatherForecast(result.location || result.wikiword, result.units);
	else if (result.intent === "local_time") clock.localDateTime(result.location);
	else if (result.intent === "cantina_tomorrow") getMenu("tomorrow");
	else if (result.intent === "cantina_today") getMenu("today");
	else if (result.intent === "help") marvinHelp();
	else if (result.intent === "photo") photo();
	else if (result.intent === "authors") authors();
	else if (result.intent === "word_of_the_day") wordOfADay(result.dictionary);
	else if (result.intent === "get_student") read_input(v2Users.studentInfo);
	else if (result.intent === "projects") read_input(v2projects.getBestProjects);
	else if (result.intent === "corrections") read_input(loadCorrections);
	else if (result.intent === "map") read_input(studentOnMap);
	else if (result.intent === "events") calendar(result.period, result.date);
	else if (result.intent === "wikiDefinition") wikiDefinition(result.wikiword);
	else if (result.intent === "news") news(); 
	else if (result.intent === "joke") joke();
	else if (result.intent === "how_are_you") howAreYou();
	else send_message("You asked for \"" + result.text + "\".<br> I don't understand you.");
}

function add_analytics_data(result) {
	var existingFunctions = ["get_weather", "forecast", "local_time", "cantina_tomorrow", "cantina_today", "help", "authors",
		"word_of_the_day", "get_student", "projects", "corrections", "map", "events", "wikiDefinition", "news", "photo"];
>>>>>>> dc376c98e0f4a3d1559a2574572cb21b28370b74

	var d = new Date();
	var knownFunction = existingFunctions.includes(result.intent);
	var find_query = {
		"source": "mirror",
		"year": d.getFullYear(),
		"month": d.getMonth() + 1,
		"date": d.getDate(),
		"function": knownFunction ? result.intent : "unknown",
		"phrase": !knownFunction ? result.text : null
	};
	var update = { $inc: {calls: 1} };

	var options =  { upsert: true, new: true };

	Analytics.findOneAndUpdate(find_query, update, options, function(err, data) {
		console.error(err);
	});
}

module.exports = command_execution;
