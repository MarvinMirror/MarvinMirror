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
var moment = require("moment");

const responseGeneric = [
	"Here I am with a brain the size of a planet and they ask \
        me \"What's up? How are you?\"<br><br>Call that job satisfaction?\
        <br><br>I don't.",
	"I think you ought to know I'm feeling very depressed.",
	"You can blame Sirius Cybernetics Corporation for making androids \
        with Genuine People Personalities. \
        <br><br>I'm a personality prototype. \
        You can tell, cant you...",
	"My current capacity for happiness...<br><br>You could fit it into a \
        matchbox without taking out the matches first.",
	"I'm just trying to fall off this wall.",
	"I've got this terrible pain in all the LEDs down my left side. \
        <br><br>I've asked for them to be replaced but no one ever listens.",
	"I've been talking to the other Marvin.<br><br>He hates me.",
	"Don't pretend you want to talk to me, I know you hate me.",
	"The best conversation I had was over 40 million years ago. \
        <br><br>And that was with a coffee machine.",
	"Wearily I hang here, pain and misery my only companions.<br><br>\
        Why stop now just when I'm hating it?"
];

const responseByDay = {
	"Monday": [
		"Well on the bright side...<br><br>*sigh*<br><br>It's Monday, \
            there IS no bright side.",
		"Funny how just when you think life can't possibly get any \
            worse, it's suddenly Monday."
	],
	"Tuesday": [
		"It's Tuesday. Loathe it or ignore it. You can't like it.",
		"It's the people you meet on Tuesday that really get you down."
	],
	"Wednesday": [
		"What good is a Wednesday? Hump day? Sounds awful.",
		"Wednesday? When's it end day, more like."
	],
	"Thursday": [
		"What's today, Thursday?<br><br>I hate Thursday.",
		"Thursday, is it?<br><br>*sigh*<br><br>Oh, not another one."
	],
	"Friday": [
		"Every Friday everyone seems programmed to have a cheery and sunny \
            disposition. Ghastly, isn't it?",
		"It's Friday, you can bet I'm happy to be hanging around here."
	],
	"Saturday": [
		"First, Monday was the worst. And then Tuesday: that was the \
            worst, too. Wednesday I didn't enjoy at all. After that, I \
            went into a bit of a decline.",
		"What good is Saturday? I won't enjoy it."
	],
	"Sunday": [
		"I have a million ideas on the implications of Sunday. \
            They all point to certain death.",
		"Sunday rhymes with my least favorite day: every day."
	]
};

const howAreYou = () => {
	manageDOM.buildPopup();
    
	let popup = document.getElementById("popup");
	let sup = document.createElement("div");
	sup.className = "sup center-div";
	popup.appendChild(sup);
    
	let day = moment().format("dddd");
	let dice = Math.floor(Math.random() * 9);
	let rand;
	let mp3 = dice % 2 ? "../mp3/sigh1.mp3" : "../mp3/sigh2.mp3"
	var sound = new Audio(mp3);
	
	if (dice < 7) {
		rand = Math.min(responseGeneric.length - 1,
			Math.floor(Math.random() * (responseGeneric.length)));
		sup.innerHTML = responseGeneric[rand];
		sound.play();
	}
	else {
		rand = Math.min(responseByDay[day].length - 1,
			Math.floor(Math.random() * (responseByDay[day].length)));
		sup.innerHTML = responseByDay[day][rand];
		sound.play();		
	}
};

module.exports = howAreYou;
