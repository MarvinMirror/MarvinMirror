var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("urban dictonary word");

//curl used to test:
//curl 'https://graph.facebook.com/v2.11/42SiliconValley?fields=posts&access_token=196637397563632|6e5049a9b266fff6438ff0b9d1bf5ff7'

function wordOfADay(flag) {
  manageDOM.clearContent("content");
//  var word_div = document.createElement("div");
//  word_div.id = 'UrbanDictWord';
//  manageDOM.array2Div(['word_Div'], "content");

// creates HTML

  var elements = [
    'word', 'word_definition', 'word_example'
  ];

manageDOM.array2Div(elements, "content");
  //var contentdiv = document.getElementById("content_wrapper");
  //contentdiv.appendChild(word_div);

  if (flag)
    var wordAPI = 'http://api.urbandictionary.com/v0/random';
  else
    var wordAPI = 'http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

  getJSON(wordAPI, function(err, data){
    if (err) throw err;
    else {
      console.log(data);
      document.getElementById('word').setAttribute("class", "word");
      document.getElementById('word_definition').setAttribute("class", "word_definition");
      document.getElementById('word_example').setAttribute("class", "word_example");

      if (flag) {
        document.getElementById('word').innerHTML = data.list[0].word;
        document.getElementById('word_definition').innerHTML = data.list[0].definition;
        document.getElementById('word_example').innerHTML = "\"" + data.list[0].example + "\"" ;
      }
      else {
        document.getElementById('word').innerHTML = data.word;
        document.getElementById('word_definition').innerHTML = data.definitions[0].text;
        document.getElementById('word_example').innerHTML = "\"" + data.examples[0].text + "\"" ;
      }

      //  word_div.innerHTML = data.list[0].word ;
      //  fbdiv.appendChild(fb_text);
        // var dots = "";
        // if (data.posts.data[0].message.length > 300)
        //   dots = "...";
        //
        // var fb_icon = document.createElement("img");
  			// fb_icon.setAttribute("src", "../img/fb_icon.png")
  			// fbdiv.appendChild(fb_icon);
        //
        // var fb_text = document.createElement("div");
        // fb_text.setAttribute("class", "post_text");
        // fb_text.innerHTML = data.posts.data[0].message.substring(0, 300) + dots;
        // fbdiv.appendChild(fb_text);
      }
    });
}
