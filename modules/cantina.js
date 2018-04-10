/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Kyle Murray                **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var moment = require("moment");

var getJSON = require("../src/getJSON");
var manageDOM = require("../src/manageDOM");
var Menu = require("../src/mongoDB").Models.Menu;
var cantinaAPI = require("../config/config").cantinaAPI;

"use strict";

/*  Compare function for the array.sort method for organizing meals */
function compare(f,g) {
	if (f.place_id > g.place_id)
		return 1;
	else if (f.place_id < g.place_id)
		return -1;
	var A = new Date(f.begin_at);
	var B = new Date(g.begin_at);
	if (A < B)
		return -1;
	if (A > B)
		return 1;
	return 0;
}

// Helper function to convert date to format
function dateFormat(dateTime, format) {
	return moment(Date.parse(dateTime)).format(format);
}

let menuDevOptions = {

	// Dev function to manually delete menu docs from mongoDB
	delMenu: () => {
		var delToday = Menu.findOneAndRemove({"day" : "Today"});
		var delTomorrow = Menu.findOneAndRemove({"day" : "Tomorrow"});
        
		delToday.exec( (err) => {
			if (err) throw err;
			console.log("Removed Today");
		});
		delTomorrow.exec( (err) => {
			if (err) throw err;
			console.log("Removed Tomorrow");
		});
	},

	// Dev function to console.log current menu docs in mongoDB 
	showMenu: () =>  {
		var today = Menu.findOne({"day" : "Today"});
		var tomorrow = Menu.findOne({"day" : "Tomorrow"});

		today.exec(function(err, data) {
			console.log(data);
		});
		tomorrow.exec(function(err, data) {
			console.log(data);
		});
	}
};

// Updates menu doc for a given day, as needed
function updateMenuByDay(day, menu) {
	var cafe_42 = "";
	var arr = [];
 
	/*  Iterates through array that contains only objects
        from the Cantina API that are for the specified day
        and separates by whether it's a meal or special item */
	for (let i = 0; i < menu.length; i++ ) {        
		if (menu[i].place_id == 1){
			arr.push(menu[i]);
		}
		else {
			cafe_42 = menu[i];
		}
	}

	/*  Building objects to be used as parameters in the 
        findOneAndUpdate method for the Menu schema in the
        database. 'upsert: true' will create a new db entry
        if one does not exist */
	var find_query = { "day": day };
	var update = {
		"day": day,
		"date": day === "Today" ? moment().format("MMMM D YYYY") : moment().add(1, "days").format("MMMM D YYYY"),
		"meal_0": arr.length > 0 ? JSON.stringify(arr[0]) : null,
		"meal_1": arr.length > 1 ? JSON.stringify(arr[1]) : null,
		"meal_2": arr.length > 2 ? JSON.stringify(arr[2]) : null,
		"cafe42": cafe_42 === "" ? null : JSON.stringify(cafe_42)
	}; 
	var options = { upsert: true, new: true };    
	Menu.findOneAndUpdate(find_query, update, options)
		.then(() => {
			console.log("Updated menu for " + day + " in db!");
			return Promise.resolve();
		});
}

/* Function to update our DB with today's and tomorrow's menus */
var menuUpdateMongo = () => {

	/*  Promise function that gets a JSON object from the 42 
        Cantina API and resolves with an object that contains 
        arrays for today's and tomorrow's meals */
	let menuArrays = new Promise( (resolve, reject) => {
		let a = [];
		let b = [];
        
		getJSON(cantinaAPI, (err, cantinaObj) => {
			if (err) {
				console.log("rejected");
				reject(err);
			}
			else {
				console.log("resolved");
				for (var key in cantinaObj) {
					let date = dateFormat(cantinaObj[key].begin_at, "MMMM D YYYY");        
					if (date === moment().format("MMMM D YYYY")) {
						a.push(cantinaObj[key]);
					}
					else if (date === moment().add(1, "days").format("MMMM D YYYY")) {
						b.push(cantinaObj[key]);
					}
				}
				a.sort(compare);
				b.sort(compare);
				var menuDays = {
					today: a,
					tomorrow: b
				};            
				resolve(menuDays);
			}
		});
	});

	/*  Chain of promises that returns menu objects from the
        Cantina API, sorts them into arrays for Today and Tomorrow
        and then updates the database. This should be done once per
        day */
	menuArrays
		.then( (menuDays) => {
			updateMenuByDay("Today", menuDays.today);
			updateMenuByDay("Tomorrow", menuDays.tomorrow);
		})
		.catch(console.error);
};


// Retrieves today's or tomorrow's 42 Cantina menu from our DB
function getMenu(str) {
    
	manageDOM.clearContent("content");
    
	// query mongoDB for cached menu
	let day = str === "today" ? "Today" : "Tomorrow";
	let menuDay = Menu.findOne( {"day": day});
    
	// Builds html elements for either today's or tomorrow's menu
	menuDay.exec( (err, data) => {
		if (err) throw (err);
		else if (data != null) {
			let arr = [];
			let i = 1;

			if (data.meal_0 != null) { arr.push(JSON.parse(data.meal_0)); }
			if (data.meal_1 != null) { arr.push(JSON.parse(data.meal_1)); }
			if (data.meal_2 != null) { arr.push(JSON.parse(data.meal_2)); }
            
			// create an array of elements to build the DOM
			let meal_list = ["cantina-wrapper center-div", "cantina-greet"];
			for (let j = 0; j < arr.length; j++) {
				meal_list.push("spacer" + i);
				meal_list.push("time" + i);
				meal_list.push("meal" + i);
				i++;
			}
			if (data.cafe42 != null) {
				meal_list.push("spacer" + i);
				meal_list.push("cafe");
			}

			manageDOM.array2Div(meal_list);
            
			document.getElementById("cantina-greet").innerHTML = "the 42 cantina menu for " + str + " is";
            
			// for each div, give it a class and add appropriate content whether it is time or meal descroption
			for (i = 2; i < meal_list.length; i++) {
				if (meal_list[i][0] === "t") {
					let date = new moment(Date.parse(arr[Math.floor((i - 2) / 3)].begin_at));
					let date_end = new moment(Date.parse(arr[Math.floor((i - 2) / 3)].end_at));
					let t = document.getElementById(meal_list[i]);
					let item = arr[Math.floor((i - 1) / 3)];
					t.setAttribute("class", "cantina-hours");
					t.innerHTML = "<span style='text-decoration:underline'>\
                    $" + item.price + "</span> -- \
                    Served from " + date.format("HH:mm") + " until " + date_end.format("HH:mm") + ":";                   
				}
				else if (meal_list[i][0] === "m") {
					let m = document.getElementById(meal_list[i]);
					m.setAttribute("class", "meal");
					let item = arr[Math.floor((i - 2) / 3)];
					let br = item.menu;

					// Replaces 'line feed' and 'carriage return' with and HTML break
					br = br.replace(/\r\n/g, "<br />");
					m.innerHTML = br;              
				}
				else if (meal_list[i][0] === "c") {
					let c = document.getElementById("cafe");
					c.setAttribute("class", "meal");
					let cafe42 = JSON.parse(data.cafe42);
					let cafe42Menu = cafe42.menu;
					cafe42Menu = cafe42Menu.replace(/\r\n/g, "<br />").replace("cafe 42",
						"<span class=\"cafe\">Cafe 42:</span> ~ \
                    <span style=\"font-style:italic;text-decoration:underline\">\
                    $" + cafe42.price + "</span>");
					c.innerHTML = cafe42Menu;
				}
				else {
					let s = document.getElementById(meal_list[i]);
					s.setAttribute("class", "spacing");
				}
			}
		}
		else {
			console.log("Error retrieving Cantina menu from Mongo DB");
		}
	});
}

module.exports.menuUpdate = menuUpdateMongo;
module.exports.getMenu = getMenu;
module.exports.menuDevOptions = menuDevOptions;