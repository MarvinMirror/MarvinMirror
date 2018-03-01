var getWeatherAtLocation = require('../modules/weather');
var weatherForecast = require('../modules/forecast');
var localDateTime = require('../modules/clock');
var getMenu = require('../modules/cantina').getMenu;
var marvinHelp = require('../modules/help');
var authors = require('../modules/author');
var wordOfADay = require('../modules/word_of_a_day');
var wikiDefinition = require('../modules/wikiDefinition');
var calendar = require('../modules/calendar');
var news = require('../modules/news');


var marvinReacts = {
    command_execution : (event, message) => {
        var result = JSON.parse(message)
        console.log(result)
        if (result.intent === 'get_weather') getWeatherAtLocation(result.location, result.units);
        else if (result.intent === 'forecast') weatherForecast(result.location, result.units);
        else if (result.intent === 'local_time') localDateTime(result.location);
        else if (result.intent === 'cantina_tomorrow') getMenu('tomorrow');
        else if (result.intent === 'cantina_today') getMenu('today');
        else if (result.intent === 'help') marvinHelp();
        else if (result.intent === 'authors') authors();
        else if (result.intent === 'word_of_the_day') wordOfADay(1);
        else if (result.intent === 'get_me') manageDOM.studentPopup('v2Users.userInfo');
        else if (result.intent === 'get_student') manageDOM.studentPopup('v2Users.studentInfo');
        else if (result.intent === 'projects') manageDOM.studentPopup('projectFunctions.getBestProjects');
        else if (result.intent === 'corrections') manageDOM.studentPopup('loadCorrections');
        else if (result.intent === 'map') manageDOM.studentPopup('studentOnMap');
        else if (result.intent === 'events') calendar(result.period, result.date);
        else if (result.intent === 'wikiDefinition') wikiDefinition(result.wikiword);
        else if (result.intent === 'news') news();
        else send_message('You asked for "' + result.text + '".<br> I don\'t understand you.')
    },

    listen_gif : (event, message) => {
        manageDOM.clearContent('content');
        if (document.getElementById('popup')) document.body.removeChild(document.getElementById('popup'));
        manageDOM.array2Div(["sound_gif","sound_gif"], "content");
        var sound_div = document.getElementById('sound_gif');
        var gif = document.createElement("img");
        gif.setAttribute("src", "../img/giphy.gif");
        sound_div.appendChild(gif);
    },

   process_gif: () => {
        manageDOM.clearContent("content");
        manageDOM.array2Div(["process_gif","process_gif"], "content");
        var sound_div = document.getElementById('process_gif');
        var gif = document.createElement("img");
        gif.setAttribute("src", "../img/giphy2.gif");
        sound_div.appendChild(gif);
    },

   delete_gif : (event, message) => {
        manageDOM.clearContent("content");
    },

   marvin_gif: () => {
        var phrases = [
        "Start with \"Hey Marvin...\"",
        "Ask me about the weather",
        "What is the answer to the Ultimate Question?",
        "I'm feeling very depressed",
        "Don't talk to me about life",
        "Here I am with a brain the size of a planet...",
        "Hey you, YES YOU"];
        manageDOM.clearContent("content");
        manageDOM.array2Div(["marvin","marvin_gif", "spot1", "spot2", "spot3", "spot4", "spot5"], "content");
        var marvin_div = document.getElementById('marvin_gif');
        var gif = document.createElement("img");
        gif.setAttribute("src", "../img/marvin.gif");
        marvin_div.appendChild(gif);
        var timer;
        timer = random_phrases(0, phrases);

       function random_phrases(spot_one, phrases) {
            if (spot_one != '0') document.getElementById('spot'+ spot_one).innerHTML = "";
            console.log("spot one:" + spot_one);
            var text = phrases[Math.floor(Math.random() * phrases.length)];
            var spot_two = Math.floor(Math.random() * 5) + 1;
            document.getElementById('spot'+ spot_two).innerHTML = text;
            console.log("spot two:" + spot_two);

            clearTimeout(timer);
            timer = setTimeout(random_phrases, 3000, spot_two, phrases)
        }
    },

   empty_response: () => {
        manageDOM.clearContent("content");
        console.log(document.getElementById('popup'))
        // setTimeout(talkToMe_dialog, 1500)
    },
}
function send_message(message)
    {
        manageDOM.clearContent("content");
        manageDOM.array2Div(["message"], "popup");
        var message_div = document.getElementById('message');
        message_div.className += ' center-div';
        message_div.innerHTML = message;
    }


function talkToMe_dialog() {
    var dialog = document.getElementById('content');
    if (!dialog.innerHTML.length && !document.getElementById('popup')) marvinReacts.marvin_gif();
}

function gif() {
    manageDOM.clearContent("content");
    manageDOM.array2Div(["sound_gif","sound_gif"], "content");
    var sound_div = document.getElementById('sound_gif');
    var gif_img = document.createElement("img");
    gif_img.setAttribute("src", "../img/giphy.gif");
    sound_div.appendChild(gif_img);
}

module.exports = marvinReacts;
