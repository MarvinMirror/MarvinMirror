function send_no_student_message(message)
{
    manageDOM.clearContent("content");
    manageDOM.array2Div(["message","not_found"], "content");
    var message_div = document.getElementById('not_found');
    message_div.innerHTML = message;
}

function command_execution(event, message) {
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
    else if (result.intent === 'get_me') manageDOM.studentPopup('loadUser');
    else if (result.intent === 'get_student') manageDOM.studentPopup('loadStudent');
    else if (result.intent === 'projects') manageDOM.studentPopup('loadStudentProjects');
    else if (result.intent === 'corrections') manageDOM.studentPopup('loadCorrections');
    else if (result.intent === 'map') manageDOM.studentPopup('studentOnMap');
    else if (result.intent === 'events') Calendar('month');
    else send_no_student_message('You asked for "' + result.text + '".<br> I don\'t understand you.')
}

module.exports = command_execution;
