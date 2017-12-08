var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("FB_post");

//curl used to test:
//curl 'https://graph.facebook.com/v2.11/42SiliconValley?fields=posts&access_token=196637397563632|6e5049a9b266fff6438ff0b9d1bf5ff7'

function fb_post() {

    var fbdiv = document.getElementById("fb_post");
    var fb_app = config.fb_app;
    var fbAPI = config.fbAPI+'?fields=posts&access_token=' + fb_app.client_id +'|'+fb_app.app_secret;

    getJSON(fbAPI, function(err, data){
      if (err) throw err;
      else {
        var dots = "";
        if (data.posts.data[0].message.length > 300)
          dots = "...";

        var fb_icon = document.createElement("img");
  			fb_icon.setAttribute("src", "../img/fb_icon.png")
  			fbdiv.appendChild(fb_icon);

        var fb_text = document.createElement("div");
        fb_text.setAttribute("class", "post_text");
        fb_text.innerHTML = data.posts.data[0].message.substring(0, 300) + dots;
        fbdiv.appendChild(fb_text);
      }
    });
}
