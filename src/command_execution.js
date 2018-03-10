var getWeatherAtLocation = require('../modules/weather');
var weatherForecast = require('../modules/forecast');
var clock = require('../modules/clock');
var getMenu = require('../modules/cantina').getMenu;
var marvinHelp = require('../modules/help');
var authors = require('../modules/author');
var wordOfADay = require('../modules/word_of_a_day');
var wikiDefinition = require('../modules/wikiDefinition');
var calendar = require('../modules/calendar');
var news = require('../modules/news');
var read_input = require('../src/get_input');
var studentOnMap = require('../modules/maps.js');
var Analytics = require("../src/mongoDB").Models.Analytics;
var send_message = require('../src/controller').message;
var photo = require('../modules/photoBooth.js');

function command_execution (event, message) {
    var result = JSON.parse(message)
    console.log(result)
    add_analytics_data(result)
    if (result.intent === 'get_weather') getWeatherAtLocation(result.location, result.wikiword, result.units);
    else if (result.intent === 'forecast') weatherForecast(result.location, result.units);
    else if (result.intent === 'local_time') clock.localDateTime(result.location);
    else if (result.intent === 'cantina_tomorrow') getMenu('tomorrow');
    else if (result.intent === 'cantina_today') getMenu('today');
    else if (result.intent === 'help') marvinHelp();
    else if (result.intent === 'photo') photo();
    else if (result.intent === 'authors') authors();
    else if (result.intent === 'word_of_the_day') wordOfADay(1);
    else if (result.intent === 'get_student') manageDOM.studentPopup(v2Users.studentInfo);
    else if (result.intent === 'projects') manageDOM.studentPopup(projectFunctions.getBestProjects);
    else if (result.intent === 'corrections') manageDOM.studentPopup(loadCorrections);
    else if (result.intent === 'map') read_input(studentOnMap);
    else if (result.intent === 'events') calendar('month');
    else if (result.intent === 'wikiDefinition') wikiDefinition(result.wikiword);
    else if (result.intent === 'news') news();
    else send_message('You asked for "' + result.text + '".<br> I don\'t understand you.')
}

function add_analytics_data(result) {
    var existingFunctions = ['get_weather', 'forecast', 'local_time', 'cantina_tomorrow', 'cantina_today', 'help', 'authors',
    'word_of_the_day', 'get_student', 'projects', 'corrections', 'map', 'events', 'wikiDefinition', 'news', 'photo'];

    var d = new Date();
    var knownFunction = existingFunctions.includes(result.intent);
    console.log(knownFunction)
    var find_query = {
        'source': 'mirror',
        'year': d.getFullYear(),
        'month': d.getMonth() + 1,
        'date': d.getDate(),
        'function': knownFunction ? result.intent : 'unknown',
        'phrase': !knownFunction ? result.text : null
    }
    var update = { $inc: {calls: 1} }
    
    var options =  { upsert: true, new: true };

    Analytics.findOneAndUpdate(find_query, update, options, function(err, data) {
        console.log(err)
    })
}

module.exports = command_execution;

