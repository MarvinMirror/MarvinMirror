let manageDOM = require("./manageDOM");

var marvinReacts = {
   
    /********* THIS AND PROCESS ARE ESSENTIALLY THE SAME, CAN MAKE mgDOM FUNCTION ********************/
	listen_gif : () => {
		manageDOM.clearContent("content");
		manageDOM.delPopup();
        
		let content = document.getElementById("content");
		let listen_gif = document.createElement("div");
		listen_gif.className = "listen-gif center-div";
		let gif = document.createElement("img");
		content.appendChild(listen_gif);
		gif.setAttribute("src", "../img/giphy.gif");
		listen_gif.appendChild(gif);
	},

	process_gif: () => {
		manageDOM.clearContent("content");
        
		let content = document.getElementById("content");
		let process_gif = document.createElement("div");
		process_gif.className = "process-gif center-div";
		let gif = document.createElement("img");
		gif.setAttribute("src", "../img/giphy2.gif");
		content.appendChild(process_gif);
		process_gif.appendChild(gif);
	},

    /******************* DO WE NEED THIS FUNCTION *******************/
	delete_gif : () => {
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
		manageDOM.array2Div(["marvin","marvin_gif", "spot1", "spot2", "spot3", "spot4", "spot5"]);
		var marvin_div = document.getElementById("marvin_gif");
		var gif = document.createElement("img");
		gif.setAttribute("src", "../img/marvin.gif");
		marvin_div.appendChild(gif);
		var timer;
		timer = random_phrases(0, phrases);

		function random_phrases(spot_one, phrases) {
			if (spot_one != "0") document.getElementById("spot"+ spot_one).innerHTML = "";
			console.log("spot one:" + spot_one);
			var text = phrases[Math.floor(Math.random() * phrases.length)];
			var spot_two = Math.floor(Math.random() * 5) + 1;
			document.getElementById("spot"+ spot_two).innerHTML = text;
			console.log("spot two:" + spot_two);

			clearTimeout(timer);
			timer = setTimeout(random_phrases, 3000, spot_two, phrases);
		}
	},

	empty_response: () => {
		manageDOM.clearContent("content");
		console.log(document.getElementById("popup"));
		// setTimeout(talkToMe_dialog, 1500)
	},
};
var send_message = (message) => {
	manageDOM.clearContent("content");
	manageDOM.delPopup();
	manageDOM.array2Div(["message"]);
	var message_div = document.getElementById("message");
	message_div.className += " center-div";
	message_div.innerHTML = message;
};


function talkToMe_dialog() {
	var dialog = document.getElementById("content");
	if (!dialog.innerHTML.length && !document.getElementById("popup")) marvinReacts.marvin_gif();
}

module.exports = marvinReacts;
module.exports.message = send_message;