var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("FB_post");

//curl used to test:
//curl 'https://graph.facebook.com/v2.11/42SiliconValley?fields=posts&access_token=196637397563632|6e5049a9b266fff6438ff0b9d1bf5ff7'

function fb_post() {
    var fbdiv = document.getElementById("fb_post");
    var fb_app = config.fb_app;

    var fbAPI = fb_app.fbAPI+'?fields=posts&access_token=' + fb_app.client_id +'|'+fb_app.app_secret;

    getJSON(fbAPI, function(err, data){
      console.log(data);
      if (err) throw err;
      else {
        var dots = "";
        //depending on how they create fb posts,..
        //..the actual message may be stored either in property 'message' or 'story'
        if ( 'message' in data.posts.data[0]){
          var endpoint = 'message';}
        else if('story' in data.posts.data[0]){
          var endpoint = 'story';
        }
        console.log(data.posts.data[0][endpoint]);
        if (data.posts.data[0][endpoint].length > 300)
          dots = "...";
        //time when post was done
        var dt = moment(data.posts.data[0].created_time).format("ddd, MMMM D, HH:mm");

        var fb_icon = document.createElement("img");
  			fb_icon.setAttribute("src", "../img/fb_icon.png")

        var fb_img = document.createElement("div");
        var fb_text = document.createElement("div");
        //var fb_text_time = document.createElement("div");

  			fb_img.append(fb_icon);
        fb_text.setAttribute("class", "post_text");
        //fb_text_time.setAttribute("class", "post_text_time");

        //fb_text_time.innerHTML = dt;
        fb_text.innerHTML = dt + '<br>' +data.posts.data[0][endpoint].substring(0, 300) + dots;
        fbdiv.append(fb_img, fb_text);
      }
    });
}
