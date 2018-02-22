var manageDOM = require("../src/manageDOM");

var helpHTML = "\
    <div class=\"help-wrapper center-div\">\
        <div class=\"help__header\">\
            <h2>Start with \"Hey Marvin,\" then try:</h2>\
        </div>\
        <ul>\
            <li>What is the weather like in Paris?</li>\
            <li>Show me the forecast for South Lake Tahoe.</li>\
            <li>What is the cantina serving today (or tomorrow)?</li>\
            <li>What is the time in Moscow?</li>\
            <li>What is the word of the day?</li>\
            <li>Show me 42's event calendar.</li>\
            <li>Show a student's info.</li>\
            <li>Show me a student's location in the lab.</li>\
            <li>Show me a student's best projects.</li>\
            <li>Who made you?</li>\
        </ul>\
    </div>\
";

// DECIDE WHETHER OR NOT TO ADD A WAIT AND THEN HELPER FILE

// function promptHelp() {
    
// 	let prompt = document.createElement("div");
// 	let prompt__text = document.createElement("div");
    
// 	prompt.setAttribute("class", "prompt");
// 	prompt__text.setAttribute("class", "prompt__text");
    
// 	dialog = document.getElementById("dialog");
// 	dialog.appendChild(prompt);
// 	prompt.appendChild(prompt__text);
    
// 	prompt__text.innerHTML = "Not sure what to ask? Try:<br><br>\"Hey Marvin, could you help me out?\"";
    
// 	function clearDialog() {
// 		dialog.removeChild(prompt);
// 	}

// 	// setTimeout(clearDialog, 20000);

// }

function marvinHelp() {

	//clear content div
	manageDOM.clearContent("content");
	
	// creating new html
	manageDOM.buildPopup();
	document.getElementById("popup").innerHTML = helpHTML;
}

module.exports = marvinHelp;