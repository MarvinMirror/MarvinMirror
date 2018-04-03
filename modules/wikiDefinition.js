//'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=flower&exintro=1&explaintext=1'
var promiseJSON = require('../src/getJSON').promiseJSON;
var config = require('../config/config');
var marvin_reaction = require('../src/controller.js');

function show_on_screen(data){
  manageDOM.clearContent("content");
  var elements = [
    'WOD', 'word', 'word_definition'
  ];

  manageDOM.array2Div(elements);
  document.getElementById("WOD").className = "WOD center-div"
  data = data.query.pages[Object.keys(data.query.pages)];
  document.getElementById('word').setAttribute("class", "word");
  document.getElementById('word_definition').setAttribute("class", "word_definition");

   document.getElementById('word').innerHTML = data.title;
   document.getElementById('word_definition').innerHTML = data.extract;
}

function wikiDefinition(word) {
  marvin_reaction.process_gif();

  var wordAPI = config.wikipediaAPI + '?action=query&format=json&prop=extracts&titles=' + word + '&redirects=1&exsentences=3&exintro=1&explaintext=1';
  console.log(wordAPI);

  promiseJSON(wordAPI)
    .then(data => { show_on_screen(data) });
}

module.exports = wikiDefinition;
