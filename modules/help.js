/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Kyle Murray                **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var manageDOM = require("../src/manageDOM");

/*	This feature randomly picks from Marvin's features and displays 
	seven intents and example voice commands to the popup div */
function marvinHelp() {
	
	/*	Creating the array of DOM elements to be generated with one of
		our source functions */
	var elements = [
		"help-wrapper center-div",
		"help-header",
		"help-content0",
		"help-content1",
		"help-content2",
		"help-content3",
		"help-content4",
		"help-content5",
		"help-content6"	
	];
    
	/*  An array of objects that Marvin will currently pick from to
        display on the help screen.
        Current count (for rand generator): 0 to 14 */
	var actions = [
		{   
			intent: "weather",
			example: "Show me the weather for San Francisco."
		},
		{   
			intent: "forecast",
			example: "Show me the forecast for London."
		},
		{   
			intent: "cantina",
			example: "What's on the menu for [today/tomorrow]?"
		},
		{   
			intent: "local time",
			example: "What time is it in Cape Town?"
		},
		{   
			intent: "word of the day",
			example: "What is the word of the day?"
		},
		{   
			intent: "events",
			example: "Show me 42's calendar of events"
		},
		{   
			intent: "42 Student Info",
			example: "Show me info about a student"
		},
		{   
			intent: "42 Student Corrections",
			example: "Am I late for a correction?"
		},
		{   
			intent: "42 Student Projects",
			example: "Show me a student's best projects."
		},
		{   
			intent: "42 Student Location",
			example: "Find a student for me on the map"
		},
		{   
			intent: "Author",
			example: "Who made you?"
		},
		{   
			intent: "News",
			example: "Show me the news for today."
		},
		{   
			intent: "Wikipedia",
			example: "Show me the wiki for Douglas Adams."
		},
		{   
			intent: "Photobooth",
			example: "Snap a picture of me!"
		},
        {   
			intent: "Joke",
			example: "Tell me a joke!"
		},
		{
			intent: "Introduction",
			example: "Introduce Yourself"
			
		}
	];

	/*	Uses the 'elements' array to create DOM elements to build from */
	manageDOM.array2Div(elements);

	/*	Fills the text within the header box */
	document.getElementById("help-header").innerHTML = "How can Marvin help you?";

	/*  To keep track and not double up on instructions */
	let int_arr = [];

	/*	Loops through seven times to pick seven random intents without doubling up.
		This function creates a div each for the intent and example and appends those
		to existing content elements with appropriate text inside */
	for (let i = 0; i < 7 ; i++){
		let content = document.getElementById("help-content" + i);
		content.className = "help-content";
		
		let intent = document.createElement("div");
		intent.className = "help-intent";
		let example = document.createElement("div");
		example.className = "help-example";
		
		content.append(intent, example);
        
		let flag = 0;
		let int;

		/*	Ensures there will be no duplicates selected */
		while (flag === 0) {
			int = Math.floor(Math.random() * 16);
			if (int_arr.includes(int)) {
				flag = 0;
			}
			else {
				flag = 1;
				int_arr.push(int);
			}
		}

		intent.innerHTML = actions[int].intent;
		example.innerHTML = actions[int].example;
	}
}

module.exports = marvinHelp;