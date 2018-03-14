//'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=flower&exintro=1&explaintext=1'
var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("wikipedia definition");
function wikiDefinition(word) {
  manageDOM.clearContent("content");

  var elements = [
    'WOD', 'word', 'word_definition'
  ];

  manageDOM.array2Div(elements);
  document.getElementById("WOD").className = "WOD center-div"
  var wordAPI = config.wikipediaAPI + '?action=query&format=json&prop=extracts&titles=' + word + '&exsentences=3&exintro=1&explaintext=1';

  getJSON(wordAPI, function(err, data){
    if (err) throw err;
    else {
      console.log(data);
      console.log(data.query.pages[Object.keys(data.query.pages)]);

      //needed info is returned in variable 'data', but the property name is a wikipedia pageID
      // to get this property name we need to do 'Object.keys(data.query.pages)'

      data = data.query.pages[Object.keys(data.query.pages)];
      document.getElementById('word').setAttribute("class", "word");
      document.getElementById('word_definition').setAttribute("class", "word_definition");

       document.getElementById('word').innerHTML = data.title;
       document.getElementById('word_definition').innerHTML = data.extract;
      }
    });
}

module.exports = wikiDefinition;
