var moment = require('moment');
var getJSON = require('../src/getJSON');
var manageDOM = require('../src/manageDOM');

// compare function for the array.sort method for organizing meals
function compare(a,b) {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
}

var cantinaAPI = 'https://cantina.42.us.org/marvins_meals';

function getMenu() {

    manageDOM.clearContent("content");

    // sets styling for the content
	document.getElementById('content_css').setAttribute('href', '../css/cantina.css');
  
    getJSON(cantinaAPI, function(err, data) {
        if (err) throw err;
        
        var a = [];
        var i = 0;
        
        // adds only today's meal objects to array
        for (var key in data) {
            var date = new moment(Date.parse(data[key].begin_at));        
            if (date.format("dddd") == moment().format("dddd")) {            
                a.push(data[key]);
            }
        }

        // sort meal array by id
        a.sort(compare);

        // create an array of elements to build the DOM
        var meal_list = ['date'];
        a.forEach(function() {
            meal_list.push("spacer" + i);
            meal_list.push("time" + i);
            meal_list.push("meal" + i);
            i++;
        });

        manageDOM.array2Div(meal_list, "content");

        document.getElementById("date").innerHTML = "Your meals for today " + moment().format("dddd") + " are:";
        
        // for each dive, give it a class and add appropriate content whether it is time or meal descroption
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
    });
}