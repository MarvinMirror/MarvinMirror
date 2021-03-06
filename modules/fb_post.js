var moment = require("moment");

var getJSON = require("../src/getJSON");
var fbEndpoint = require("../config/config").fb_app.endpoint;
var Post = require("../src/mongoDB").Models.Post;

//curl used to test:
//curl 'https://graph.facebook.com/v2.11/42SiliconValley?fields=posts&access_token=196637397563632|6e5049a9b266fff6438ff0b9d1bf5ff7'

var fbAPI = fbEndpoint + "?fields=posts&access_token=" + process.env.MARVIN_FB_CLIENT_ID +"|"+process.env.MARVIN_FB_APP_SECRET;

/*	Runs at start and continues to update FB message in DB every hour */
var fbInterval = () => {
	get_post_text();

	setInterval(() => {
		get_post_text();
	}, 3600000);
};

var updateFBDB = (data) => {
	let endpoint = "message" in data.posts.data[0] ? "message" : "story";

	let dots = "";
	if (data.posts.data[0][endpoint].length > 200)
		dots = "...";

	// create variables with data you'll store in db
	let find_query = { "type": "FB" };
	let update = {
		"type" : "FB",
		"timestamp" : moment(data.posts.data[0].created_time).format("ddd, MMMM D, HH:mm"),
		"message" : data.posts.data[0][endpoint].substring(0, 200) + dots
	};
	let options = { upsert: true, new: true };

	var updateFB = Post.findOneAndUpdate(find_query, update, options);

	updateFB.exec( (err) => {
		if (err) throw err;
		console.log("updated FB in DB!");
	});

};

function get_post_text(){
	getJSON(fbAPI, function(err, data){
		if (err) throw err;
		else {
			//depending on how they create fb posts,..
			//..the actual message may be stored either in property 'message' or 'story'
			if ( "message" || "story" in data.posts.data[0]){
				//saving the latest fb_post into database
				updateFBDB(data);
			}
		}
	});
}

//this is a function that is being called from index.html
var fb_post = () => {
	var fbdiv = document.getElementById("fb_post");

	//creating divs and adding fb icon
	var fb_img = document.createElement("div");
	var fb_text = document.createElement("div");
	var fb_icon = document.createElement("img");
	fb_icon.setAttribute("src", "../img/fb_icon.png");
	fb_img.append(fb_icon);
	fb_text.setAttribute("class", "post_text");
	fbdiv.append(fb_img, fb_text);
	 
	 //retrieving saved post from database
	 let newData = Post.findOne({ "type": "FB" });
	 newData.exec( (err, x) => {
		 //updating div
		 fb_text.innerHTML = x.timestamp + "<br>" + x.message;
	 })

	
}

module.exports = fb_post;