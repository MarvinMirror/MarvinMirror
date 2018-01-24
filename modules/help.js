var manageDOM = require('../src/manageDOM');


function promptHelp() {
    
    let prompt = document.createElement('div');
    let prompt__text = document.createElement('div');
    
    prompt.setAttribute('class', 'prompt');
    prompt__text.setAttribute('class', 'prompt__text');
    
    dialog = document.getElementById("dialog");
    dialog.appendChild(prompt);
    prompt.appendChild(prompt__text);
    
    prompt__text.innerHTML = "Not sure what to ask? Try:<br><br>\"Hey Marvin, could you help me out?\"";
    
    function clearDialog() {
        dialog.removeChild(prompt);
    }

    // setTimeout(clearDialog, 20000);

}

function marvinHelp() {

    //clear content div
    manageDOM.clearContent("content");

    // var content = document.getElementById("content");

    // array of elements for builing new html
	var elements = [
        'help', 'help__hey-marvin', 'help__weather', 'help__forecast',
        'help__cantina', 'help__local-time',
        'help__calendar', 'help__author'
	];
	
	// creating new html
	manageDOM.array2Div(elements, "content");
    
    document.getElementById("help__hey-marvin").innerHTML = 
    "<h2>Start with \"Hey Marvin,\" then try:</h2>";

    document.getElementById("help__weather").innerHTML = "What is the weather like in Paris?";
    document.getElementById("help__forecast").innerHTML = "Show me the forecast for South Lake Tahoe.";
    document.getElementById("help__local-time").innerHTML = "What is the time in Moscow?";
    document.getElementById("help__cantina").innerHTML = "What is the cantina serving today (or tomorrow)?";
    document.getElementById("help__calendar").innerHTML = "Show me 42's event calendar.";
    document.getElementById("help__author").innerHTML = "Who made you?";
}