//Needs Fixing: if the message has '<>' (any link, ex. <https://code.org/learn> ), everything between '<' and '>' is not printed

var getJSON = require('../src/getJSON');
var config = require('../config/config');

// curl used for testing:
//curl 'https://slack.com/api/channels.history?token=xoxp-50141135975-96845516743-283476714066-25f610356a019cc2dd1627a374c3f2cf&channel=C1G4AJ96D&count=1'

console.log("slack_post");

function slack_post() {
  var slackdiv = document.getElementById("slack_post");
  var slack_app = config.slack_app
  var slackAPI = config.slackAPI+'channels.history?token=' + slack_app.token +
                  '&channel=' + slack_app.channel_announcements + '&count=100';

  getJSON(slackAPI, function(err, data){
    if (err) throw err;
    else {
      var dots = "";
      if (data.messages[0].text.length > 300)
        dots = "...";
      //going through all messages in the channel and stop if it's not 'channel_join'
      for (var i = 0; i < 100; i++) {
        if(data.messages[i].subtype != 'channel_join')
        break ;
      }
      var slack_icon = document.createElement("img");
  		slack_icon.setAttribute("src", "../img/slack_icon.jpeg")
  		slackdiv.appendChild(slack_icon);

      var slack_text = document.createElement("div");
      slack_text.setAttribute("class", "post_text");
      slack_text.innerHTML = data.messages[i].text.substring(0, 300) + dots;
      slackdiv.appendChild(slack_text);
      }
  });
}
