var moment = require("moment");

var getJSON = require("../src/getJSON");
var config = require("../config/config");
var Post = require("../src/mongoDB").Models.Post;

// console.log("FB_post");

//curl used to test:
//curl 'https://graph.facebook.com/v2.11/42SiliconValley?fields=posts&access_token=196637397563632|6e5049a9b266fff6438ff0b9d1bf5ff7'

//saving the latest fb_post into database
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
		'message' : data.posts.data[0][endpoint].substring(0, 200) + dots
	};
	let options = { upsert: true, new: true };

	var updateFB = Post.findOneAndUpdate(find_query, update, options);

	updateFB.exec( (err) => {
		if (err) throw err;
		console.log("updated FB in DB!");
	});

};

function fb_post() {
	var fbdiv = document.getElementById("fb_post");
	var fb_app = config.fb_app;

	var fbAPI = fb_app.fbAPI+"?fields=posts&access_token=" + fb_app.client_id +"|"+fb_app.app_secret;

	getJSON(fbAPI, function(err, data){
		console.log(data);
		if (err) throw err;
		else {
			//depending on how they create fb posts,..
			//..the actual message may be stored either in property 'message' or 'story'
			if ( "message" || "story" in data.posts.data[0]){
				updateFBDB(data);
			}

			//retrieving saved post from database
			let newData = Post.findOne({ "type": "FB" });
			newData.exec( (err, x) => {
				var fb_img = document.createElement("div");
				var fb_text = document.createElement("div");

				var fb_icon = document.createElement("img");
				fb_icon.setAttribute("src", "../img/fb_icon.png");

				fb_img.append(fb_icon);
				fb_text.setAttribute("class", "post_text");

				fb_text.innerHTML = x.timestamp + "<br>" + x.message;
				fbdiv.append(fb_img, fb_text);
			});

		}
	});
}
