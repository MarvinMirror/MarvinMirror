//'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=flower&exintro=1&explaintext=1'
var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("news");

function news() {
  manageDOM.clearContent("content");
  manageDOM.array2Div(["news_div"], "popup");

  document.getElementById("news_div").className = "center-div";

  news_api = config.news_api;
  console.log(news_api.sources.length);
  for (var j = 0; j < news_api.sources.length; j++){
    // creating url
    var newsAPI = news_api.newsAPI2 + news_api.sources[j] + '&language=en&apiKey=' + news_api.Key;
    getJSON(newsAPI, function(err, data){
      if (err) throw err;
      else {
        console.log(data);
        var curr_news = data.articles[0];
        var i = curr_news.source.name;

          //creating a div for one news and fill it with data
        var el = ['news' + i,'source' + i, 'title' + i, 'description' + i];
        manageDOM.array2Div(el, "news_div");

        document.getElementById('news' + i).className = 'news';
        document.getElementById('source' + i).className = "source";
        document.getElementById('title' + i).className = "title";
        document.getElementById('description' + i).className = "description";

        document.getElementById('source' + i).innerHTML = curr_news.source.name + ":";
        document.getElementById('title' + i).innerHTML = curr_news.title;
        document.getElementById('description' + i).innerHTML = curr_news.description;
      }
    });
  }
}

module.exports = news;