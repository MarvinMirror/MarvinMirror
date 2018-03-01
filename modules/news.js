//'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=flower&exintro=1&explaintext=1'
var getJSON = require('../src/getJSON');
var config = require('../config/config');

console.log("news");

function news() {
  manageDOM.clearContent("content");
  manageDOM.array2Div(["news_div"], "popup");

  document.getElementById("news_div").className = "center-div";
  news_api = config.News_api;
  var newsAPI = news_api.newsAPI + '?country=us&apiKey=' + news_api.Key;
  getJSON(newsAPI, function(err, data){
    if (err) throw err;
    else {
      console.log(data);
      var curr_news;
      for (var i = 0; i < news_api.number ; i++) {
        curr_news = data.articles[i];

        var el = ['news' + i,'source' + i, 'title' + i, 'description' + i];
        manageDOM.array2Div(el, "news_div");

        document.getElementById('news' + i).className = 'NEWS';
        document.getElementById('source' + i).className = "source";
        document.getElementById('title' + i).className = "title";


        document.getElementById('source' + i).innerHTML = curr_news.source.name;
        document.getElementById('title' + i).innerHTML = curr_news.title;
        document.getElementById('description' + i).innerHTML = curr_news.description;
      }
    }
  });
}

module.exports = news;