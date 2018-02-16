var getJSON = require('../src/getJSON');
var config = require('../config/config');

function wordOfADay(flag) {
  manageDOM.clearContent("content");

  var elements = [
    'WOD', 'word', 'word_definition', 'word_example'
  ];

  manageDOM.array2Div(elements, "popup");
  document.getElementById("WOD").className = "WOD center-div"
  if (flag)
  {  var wordAPI = config.urbanDictionaryAPI;
    console.log(wordAPI);}
  else
    var wordAPI = config.wordnikAPI;

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
      }
    });
}

module.exports = wordOfADay;