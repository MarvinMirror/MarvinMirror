
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
        else if (result.intent === 'projects') manageDOM.studentPopup('loadStudentProjects');
        else if (result.intent === 'corrections') manageDOM.studentPopup('loadCorrections');
        else if (result.intent === 'map') manageDOM.studentPopup('studentOnMap');
        else if (result.intent === 'events') Calendar('month');
        else if (result.intent === 'wikiDefinition') wikiDefinition(result.wikiword);

        else send_message('You asked for "' + result.text + '".<br> I don\'t understand you.')
    },

    listen_gif : (event, message) => {
        manageDOM.clearContent("content");
        manageDOM.clearContent("dialog");
        document.body.removeChild(document.getElementById('popup'));
        manageDOM.array2Div(["sound_gif","sound_gif"], "dialog");
        var sound_div = document.getElementById('sound_gif');
        var gif = document.createElement("img");
        gif.setAttribute("src", "../img/giphy.gif");
        sound_div.appendChild(gif);
    },

    process_gif: () => {
        manageDOM.clearContent("dialog");
        manageDOM.array2Div(["process_gif","process_gif"], "dialog");
        var sound_div = document.getElementById('process_gif');
        var gif = document.createElement("img");
        gif.setAttribute("src", "../img/giphy2.gif");
        sound_div.appendChild(gif);
    },

    delete_gif : (event, message) => {
        manageDOM.clearContent("dialog");
    },

    talk_message: () => {
        manageDOM.array2Div(["dialog-message","dialog-message"], "dialog");
        document.getElementById('dialog-message').innerHTML = "Hey, there! Talk to me!";
    },

    empty_response: () => {
        manageDOM.clearContent("dialog");
        setTimeout(talkToMe_dialog, 1000)
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
    var dialog = document.getElementById('dialog');
    if (!dialog.innerHTML.length) marvinReacts.talk_message();
}

function gif() {
    manageDOM.clearContent("content");
    manageDOM.clearContent("dialog");
    manageDOM.array2Div(["sound_gif","sound_gif"], "dialog");
    var sound_div = document.getElementById('sound_gif');
    var gif_img = document.createElement("img");
    gif_img.setAttribute("src", "../img/giphy.gif");
    sound_div.appendChild(gif_img);
}

module.exports = marvinReacts;
