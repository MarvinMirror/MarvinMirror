var promiseJSON = require('../src/getJSON').promiseJSON;
var config = require('../config/config');
var marvin_reaction = require('../src/controller.js');

function show_on_screen(data, flag){

  manageDOM.clearContent("content");
  var elements = [
    'WOD', 'word', 'word_definition', 'word_example'
  ];

  manageDOM.array2Div(elements);
  document.getElementById("WOD").className = "WOD center-div";
  document.getElementById('word').setAttribute("class", "word");
  document.getElementById('word_definition').setAttribute("class", "word_definition");
  document.getElementById('word_example').setAttribute("class", "word_example");

  if (flag == "bad") {
    document.getElementById('word').innerHTML = data.list[0].word;
    document.getElementById('word_definition').innerHTML = data.list[0].definition;
    document.getElementById('word_example').innerHTML = "\"" + data.list[0].example + "\"" ;
  }
  else {
    document.getElementById('word').innerHTML = data.word;
    document.getElementById('word_definition').innerHTML = data.definitions[0].text;
    document.getElementById('word_example').innerHTML = "\"" + data.examples[0].text + "\"" ;
  }
}

function wordOfADay(flag) {
  marvin_reaction.process_gif();

  //if the flag == "bad" then it means that a student wants to query UrbanDictionary
  //if the flag != "bad" then it means that a student wants to query wordnik
  if (flag == "bad")
  {  var wordAPI = config.urbanDictionaryAPI;
    console.log(wordAPI);}
  else
    var wordAPI = "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=" + process.env.MARVIN_WORDNIK_API_KEY;

    promiseJSON(wordAPI)
    .then(data => { show_on_screen(data, flag) });
}

module.exports = wordOfADay;
