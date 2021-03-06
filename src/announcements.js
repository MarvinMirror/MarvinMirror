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

var facebook = require("../modules/fb_post");
var slack = require("../modules/slack_post");

var announcements = document.getElementById("announcements");
var swap_timer = 120000;

var socialMedia = () => {
	let fb_post = document.createElement("div");
	let slack_post = document.createElement("div");

	fb_post.id = "fb_post";
	fb_post.className = "posts";
	slack_post.id = "slack_post";
	slack_post.className = "posts";

	announcements.append(fb_post, slack_post);
	facebook();
	slack();

	setTimeout( () => {
		while (announcements.hasChildNodes()) {
			announcements.removeChild(announcements.lastChild);
		}
		marvinPrompt();
	}, swap_timer);
};

var marvinPrompt = () => {
	let heyMarvin = document.createElement("div");
	let wcyd = document.createElement("div");

	heyMarvin.id = "hey-marvin";
	heyMarvin.className = "prompt hey-marvin";
	wcyd.id = "wcyd";
	wcyd.className = "prompt wcyd";

	heyMarvin.innerHTML = "\"Hey Marvin!\"";
	wcyd.innerHTML = "\"What can you do?\"";

	announcements.append(heyMarvin, wcyd);

	setTimeout( () => {
		while (announcements.hasChildNodes()) {
			announcements.removeChild(announcements.lastChild);
		}
		socialMedia();
	}, swap_timer / 2);
};