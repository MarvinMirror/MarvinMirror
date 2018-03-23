var getJSON = require("../src/getJSON");
var config = require("../config/config");
var request = require("request-promise");

var mongoose = require("mongoose");
var Post = require("../src/mongoDB").Models.Post;

var slack_app = config.slack_app;
var slackAPI = slack_app.slackAPI+"channels.history?token=" + slack_app.token + "&channel=" + slack_app.channel_announcements + "&count=100";

var update_slackDB = (text, data) => {
	// if they post a picture, insert "/img here/" instead of empty space
	if(data.subtype == "file_share"){
		//remove everything after "uploaded a file"
		text = text.replace(new RegExp("uploaded a file:.+$","g"),"uploaded a file.");
	}
	// if the title is not empty print it, because most likely the 'message' property is empty
	if ("file" in data  &&  "title" in data.file)
		text = text + "<br>" +data.file.title;
	// if the post is "simple pole"
	if ("attachments" in data && "fallback" in data.attachments[0]){
		text = text + data.attachments[0].fallback;
		if ("title" in data.attachments[0])
			text = text + " \"" + data.attachments[0].title + "\"";
	}

	var dots = "";
	if (text.length > 200)
		dots = "...";
	text = text.substring(0, 200) + dots;

	// create variables with data you'll store in db
	let find_query = { "type": "slack" };
	let update = {
		"type" : "slack",
		"timestamp" : moment.unix(data.ts).format("ddd, MMMM D, HH:mm"),
		"message" : text
	};
	let options = { upsert: true, new: true };

	//updateing DB
	var update_slack = Post.findOneAndUpdate(find_query, update, options);

	update_slack.exec( (err) => {
  		if (err) throw err;
  		console.log("updated Slack in DB!");
  	});
};

// replaces user_ids with usen_names
function ReplaceNames(text){
	//if there's no mentioned users in a message
	if (text.indexOf("<@U") == -1){
		return Promise.resolve(text);
	}
	return Promise.resolve(text).then( text => {
		return getSlackName(text);
	}).then( text => {return ReplaceNames(text);});
}

function getSlackName(text){

	//check if there is a user ID that should be substituted by username
	var start_index = text.indexOf("<@U");
	if (start_index > -1){
		var user_id = text.substring(start_index + 2, text.indexOf(">", start_index));
		//user.profile endpoint returns only one user_name at a time
		var name_API = slack_app.slackAPI + "users.profile.get?token="+ slack_app.token +
                  "&user=" + user_id;
		return (new Promise(function(resolve, reject) {
			getJSON(name_API, function(err, data){
				if (!err){
					//replaceing all user_ids with user_names
					text = text.replace(new RegExp(user_id,"g"), data.profile.display_name);
					resolve (text);
				}
				else {
					console.log("error");
				}
			});
		}));
	}
}

function get_slack_post_text(){
	getJSON(slackAPI, function(err, data){
		if (err) throw err;
		else {
			console.log(data);
			//going through all messages in the channel and stop if it's not 'channel_join'
			//and not a comment to other massage
			for (var i = 0; i < 100; i++) {
				if (data.messages[i].subtype != "channel_join"  && !("parent_user_id" in data.messages[i]))
					break ;
			}
			let text = data.messages[i].text;
			//replaceing the code of the user by the username
			ReplaceNames(text)
			//updateing latest slack_post in MongoDB
				.then(text => {
					update_slackDB(text, data.messages[i]);
				});
		}
	});

	setInterval(() => {
	  get_slack_post_text();
	}, 600000);
}

function slack_post() {

	//creating divs
	var slackdiv = document.getElementById("slack_post");
	var slack_img = document.createElement("div");
	var slack_icon = document.createElement("img");
	slack_icon.setAttribute("src", "../img/slack_icon.png");
	slack_img.appendChild(slack_icon);

	var slack_text = document.createElement("div");
	slack_text.setAttribute("class", "post_text");
	slackdiv.append(slack_img, slack_text);

	let newData = Post.findOne({ "type": "slack" });
	newData.exec( (err, x) => {
		if(err) throw err;
		slack_text.innerHTML = x.timestamp + "<br>" + x.message;
	});

}

module.exports = slack_post;
