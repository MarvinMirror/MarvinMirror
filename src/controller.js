function send_no_student_message(message)
{
    manageDOM.clearContent("content");
    manageDOM.array2Div(["message","not_found"], "content");
    document.getElementById('not_found').innerHTML = message;
}

var marvinReacts = {
    command_execution : (event, message) => {
        var result = JSON.parse(message)
        console.log(result)
        marvinReacts.delete_gif()
        if (result.intent === 'get_weather') getWeatherAtLocation(result.location, result.units);
        else if (result.intent === 'forecast') weatherForecast(result.location, result.units);
        else if (result.intent === 'local_time') localDateTime(result.location);
        else if (result.intent === 'cantina_tomorrow') getMenu('tomorrow');
        else if (result.intent === 'cantina_today') getMenu('today');
        else if (result.intent === 'help') marvinHelp();
        else if (result.intent === 'authors') authors();
        else if (result.intent === 'word_of_the_day') wordOfADay(1);
        else if (result.intent === 'get_me') manageDOM.studentPopup('loadUser');
        else if (result.intent === 'get_student') manageDOM.studentPopup('loadStudent');
        else if (result.intent === 'projects') manageDOM.studentPopup('loadStudentProjects');
        else if (result.intent === 'corrections') manageDOM.studentPopup('loadCorrections');
        else if (result.intent === 'map') manageDOM.studentPopup('studentOnMap');
        else if (result.intent === 'events') Calendar('month');
        else send_no_student_message('You asked for "' + result.text + '".<br> I don\'t understand you.')
    },

    listen_gif : (event, message) => {
        manageDOM.clearContent("content");
        manageDOM.clearContent("dialog");
        manageDOM.array2Div(["sound_gif","sound_gif"], "dialog");
        var sound_div = document.getElementById('sound_gif');
        var gif = document.createElement("img");
        gif.setAttribute("src", "../img/giphy.gif");
        sound_div.appendChild(gif);  
    },

    delete_gif : (event, message) => {
        manageDOM.clearContent("dialog");
        manageDOM.array2Div(["message","message"], "dialog");
        document.getElementById('message').innerHTML = "Hey, there! Talk to me!";
    }
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
