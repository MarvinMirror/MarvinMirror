var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("slack_post");

function slack_post() {
  var slackdiv = document.getElementById("slack_post");
  var slack_app = config.slack_app
  var slackAPI = slack_app.slackAPI+'channels.history?token=' + slack_app.token +
                  '&channel=' + slack_app.channel_announcements + '&count=100';

  getJSON(slackAPI, function(err, data){
    console.log(data);
    if (err) throw err;
    else {
      var dots = "";
      if (data.messages[0].text.length > 300)
        dots = "...";
      //going through all messages in the channel and stop if it's not 'channel_join'
      for (var i = 0; i < 100; i++) {
        if (data.messages[i].subtype != 'channel_join')
        break ;
      }
      var slack_img = document.createElement("div");
      var slack_icon = document.createElement("img");
  		slack_icon.setAttribute("src", "../img/slack_icon.png")
  		slack_img.appendChild(slack_icon);

      var slack_text = document.createElement("div");
      slack_text.setAttribute("class", "post_text");

      //replaceing the code of the user by the username
      var text = data.messages[i].text.replace("<@" + data.messages[i].user + ">", data.messages[i].username);

      // if they post a picture, insert "/img here/" instead of empty space
      if(data.messages[i].subtype == 'file_share')
        text = text.replace("uploaded a file:", "uploaded a file: /img here/.");
        // if the title is not empty print it, because most likely the 'message' property is empty
        if ("file" in data.messages[i] &&  "title" in data.messages[i].file)
          text = text + data.messages[i].file.title;

      // if the post is "simple pole"
      if ("attachments" in data.messages[i] && "fallback" in data.messages[i].attachments[0]){
        text = text + data.messages[i].attachments[0].fallback;
        if ("title" in data.messages[i].attachments[0])
          text = text + ' \"' + data.messages[i].attachments[0].title + '\"';
        }

      // if message is longer then 500 characters then cut it and add "..."
      slack_text.innerHTML = text.substring(0, 500) + dots;
      slackdiv.append(slack_img, slack_text);
      }
  });
}
