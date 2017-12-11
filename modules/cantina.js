var moment = require('moment');
var getJSON = require('../src/getJSON');
var manageDOM = require('../src/manageDOM');
var mongoose = require('mongoose');
var Menu = require('../src/mongoDB').Menu;
var cantinaAPI = require('../config/config').cantinaAPI;

// compare function for the array.sort method for organizing meals
var compare = function(a,b) {
    console.log("HERE");
    if (a.place_id > b.place_id)
        return 1;
    else if (a.place_id < b.place_id)
        return -1;
    var A = new Date(a.begin_at);
    console.log("A = " + A);
    var B = new Date(b.begin_at);
    console.log("B = "+ B);
    if (A < B)
      return -1;
    if (A > B)
      return 1;
    return 0;
}

// helper function to convert date to format
function dateFormat(dateTime, format) {
    return moment(Date.parse(dateTime)).format(format);
}

// dev function to manually delete menu docs from mongoDB
function delMenu () {
    var delToday = Menu.findOneAndRemove({'day' : 'Today'}, function (err){
        console.log('Removed Today');
    });
    var delTomorrow = Menu.findOneAndRemove({'day' : 'Tomorrow'}, function (err){
        console.log('Removed Tomorrow');
    });
}

// dev function to log current meny docs in mongoDB 
function showMenu () {
    var today = Menu.findOne({'day' : 'Today'});
    var tomorrow = Menu.findOne({'day' : 'Tomorrow'});

    today.exec(function(err, data) {
        console.log(data);
    });
    tomorrow.exec(function(err, data) {
        console.log(data);
    });
}

// Updates menu doc for a given day, as needed
function updateMenuDB(day, menu) {
    var cafe_42 = "";
    var arr = [];
    var i = 0;

    menu.forEach( function (){
        if (menu[i].place_id == 1){
           arr.push(menu[i]);
        }
        else {
            cafe_42 = menu[i];
        }
        i++; 
    });

    var find_query = { 'day': day };
    
    // update the doc if there is any data to update
    if (menu.length > 0) {
        var update = {
            'day': day,
            'date': dateFormat(menu[0].begin_at, "MMMM D YYYY"),
            'meal_0': arr.length > 0 ? JSON.stringify(arr[0]) : null,
            'meal_1': arr.length > 1 ? JSON.stringify(arr[1]) : null,
            'meal_2': arr.length > 2 ? JSON.stringify(arr[2]) : null,
            'cafe42': cafe_42 === "" ? null : JSON.stringify(cafe_42)
        }; 
        var options = { upsert: true, new: true };
        
        Menu.findOneAndUpdate(find_query, update, options, function (err, doc) {
            console.log("Updated menu for " + day + " in db!");
        });
    }
}

// Updates menu doc for 'Today' with mongoDB data for 'Tomorrow'
function updateMenuDay () {
    var find_query = { 'day': 'Tomorrow' };
    var update = { 'day': 'Today' };
    var options = { new: true };

    Menu.findOneAndUpdate(find_query, update, options, function (err, doc) {
        console.log("Updated tomorrow's menu for today");
    });
}


function getMenu(str) {

    manageDOM.clearContent("content");
  
    var a = [];
    var b = [];

    // get JSON string from 42 api
    getJSON(cantinaAPI, function(err, data) {
        if (err) throw err;

        // adds only today's meal objects to array
        for (var key in data) {
            var date = dateFormat(data[key].begin_at, "MMMM D YYYY");        
            if (date === moment().format("MMMM D YYYY")) {
                a.push(data[key]);
            }
            else if (date === moment().add(1, 'days').format("MMMM D YYYY")) {
                b.push(data[key]);
            }
        }
    });
    console.log(b);
    
    // sort meal array by time
    a.sort(compare);
    b.sort(compare);
    console.log(b);
    
    // query mongoDB for cached menu
    var today = Menu.findOne( {'day': 'Today'});
    var tomorrow = Menu.findOne( {'day': 'Tomorrow'});

    // check if db is current and update appropriately if it is not
    today.exec(function(err, data) {
        if (data == null || (a.length > 0 && dateFormat(a[0].begin_at, "MMMM D YYYY") !== data.date)) {
            tomorrow.exec(function(err, data2){
                if (data2 == null || moment().format("MMMM D YYYY") !== data2.date) {
                    updateMenuDB('Today', a);
                }
                else {
                    updateMenuDay();
                }
                updateMenuDB('Tomorrow', b);                    
            });
        }
        else {
            tomorrow.exec(function(err, data3){
                if (data3 == null) {
                    updateMenuDB('Tomorrow', b);
                }
            });
        }
    });

    var when = str === "today" ? today : tomorrow;
    
    // Builds html elements for either today's or tomorrow's menu
    when.exec(function(err, data){
        if (data != null) {
            var arr = [];
            var i = 0;

            if (data.meal_0 != null) {arr.push(JSON.parse(data.meal_0))}
            if (data.meal_1 != null) {arr.push(JSON.parse(data.meal_1))}
            if (data.meal_2 != null) {arr.push(JSON.parse(data.meal_2))}
            
            // create an array of elements to build the DOM
            var meal_list = ['cantina_greet'];
            arr.forEach(function() {
                meal_list.push("spacer" + i);
                meal_list.push("time" + i);
                meal_list.push("meal" + i);
                i++;
            });
            if (data.cafe42 != null) {
                meal_list.push("spacer" + i);
                meal_list.push("cafe");
            }

            manageDOM.array2Div(meal_list, "content");
            
            document.getElementById("cantina_greet").innerHTML = "Your meals for " + str + " are:";
            
            // for each div, give it a class and add appropriate content whether it is time or meal descroption
            for (i = 1; i < meal_list.length; i++) {
                if (meal_list[i][0] === "t") {
                    var date = new moment(Date.parse(arr[Math.floor((i - 1) / 3)].begin_at));
                    var date_end = new moment(Date.parse(arr[Math.floor((i - 1) / 3)].end_at));
                    var t = document.getElementById(meal_list[i]);
                    t.setAttribute("class", "hours");
                    t.innerHTML = "begin at " + date.format("HH mm") + " end at " + date_end.format("HH mm");                   
                }
                else if (meal_list[i][0] === "m") {
                    var m = document.getElementById(meal_list[i]);
                    m.setAttribute("class", "meal");
                    var br = arr[Math.floor((i - 1) / 3)].menu;

                    // Replaces 'line feed' and 'carriage return' with and HTML break
                    br = br.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
                    m.innerHTML = br;              
                }
                else if (meal_list[i][0] === 'c') {
                    var c = document.getElementById('cafe');
                    c.setAttribute("class", "meal cafe");
                    console.log
                    var cbr = JSON.parse(data.cafe42).menu;
                    cbr = cbr.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
                    c.innerHTML = cbr;
                }
                else {
                    var s = document.getElementById(meal_list[i]);
                    s.setAttribute("class", "spacing");
                }
            }
        }
     });
}