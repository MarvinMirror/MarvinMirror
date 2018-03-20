var getJSON = require('../src/getJSON');
var promiseJSON = require('../src/getJSON').promiseJSON;

var config = require('../config/config');

function My_array2Div (arr, parent) {

    var c = document.getElementById(parent);
    let wrapper = document.createElement("div");
    wrapper.id = arr[0];
    wrapper.className = arr[0];

    for (var i = 1, len = arr.length; i < len; i++) {
        var e = document.createElement("div");
        e.id = arr[i];
        wrapper.appendChild(e);
    };
    c.appendChild(wrapper);
}

function add_news_item_div(data){
  var curr_news = data.articles[0];
  var i = curr_news.source.name;

    //creating a div for one news item and fill it with data
  var el = ['news' + i,'source' + i, 'title' + i, 'description' + i];
  My_array2Div(el, "news_div");
  document.getElementById('news' + i).className = 'news';
  document.getElementById('source' + i).className = "source";
  document.getElementById('title' + i).className = "title";
  document.getElementById('description' + i).className = "description";

  document.getElementById('source' + i).innerHTML = curr_news.source.name + ":";
  document.getElementById('title' + i).innerHTML = curr_news.title;
  document.getElementById('description' + i).innerHTML = curr_news.description;
}

function news() {
  manageDOM.clearContent("content");
  manageDOM.array2Div(["news_div"]);

  document.getElementById("news_div").className = "center-div";

  news_api = config.news_api;

  for (var j = 0; j < news_api.sources.length - 1; j++){
    // creating url for sources[j]
    var newsAPI = news_api.newsAPI + news_api.sources[j] + '&language=en&apiKey=' + news_api.Key;
    //requesting info
    promiseJSON(newsAPI)
    //creating div and filling it with returned data
      .then( data=> {add_news_item_div(data)})
  }
}

module.exports = news;
