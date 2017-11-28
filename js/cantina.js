var moment = require('moment');
var getJSON = require('../modules/getJSON');
var manageDOM = require('../modules/manageDOM');

function compare(a,b) {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
}

var cantinaAPI = 'https://cantina.42.us.org/marvins_meals';

function getMenu() {

    manageDOM.clearContent();

    // sets styling for the content
	document.getElementById('content_css').setAttribute('href', '../css/cantina.css');
  
    getJSON(cantinaAPI, function(err, data) {
        if (err) {
            console.log("call didn't work");
        }
        else {
            var a = [];
            var i = 0;
            // console.log(data);
            for (var key in data) {
                var date = new moment(Date.parse(data[key].begin_at));        
                if (date.format("dddd") == moment().format("dddd")) {            
                    a.push(data[key]);
                }
            }
  
            a.sort(compare);

            var meal_list = ['date'];

            a.forEach(function() {
                meal_list.push("spacer" + i);
                meal_list.push("time" + i);
                meal_list.push("meal" + i);
                i++;
            });

            manageDOM.array2Div(meal_list);

            document.getElementById("date").innerHTML = "Your meals for today " + moment().format("dddd") + " are:";
            
            for (i = 1; i < meal_list.length; i++) {
                if (meal_list[i][0] === "t") {
                    var date = new moment(Date.parse(a[Math.floor((i - 1) / 3)].begin_at));
                    var date_end = new moment(Date.parse(a[Math.floor((i - 1) / 3)].end_at));
                    var t = document.getElementById(meal_list[i]);
                    t.setAttribute("class", "hours");
                    t.innerHTML = "begin at " + date.format("HH mm") + " end at " + date_end.format("HH mm");                   
                }
                else if (meal_list[i][0] === "m") {
                    var m = document.getElementById(meal_list[i]);
                    m.setAttribute("class", "meal");
                    var br = a[Math.floor((i - 1) / 3)].menu;
                    br = br.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
                    m.innerHTML = br;              
                }
                else {
                    var s = document.getElementById(meal_list[i]);
                    s.setAttribute("class", "spacing");
                }
            }
        }
    });
}