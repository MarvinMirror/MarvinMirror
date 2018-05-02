var send_message = require("../src/controller.js").message;
var manageDOM = require("../src/manageDOM");

function speech(voice){
    responsiveVoice.speak(voice, "UK English Male");
}

function introduction(){
	var voice = 'Hello. My name is Marvin! As you can see. I am a Mirror. I was created and designed at. 42. I am pleased to meet you.';
	speech(voice);
}

module.exports = introduction;