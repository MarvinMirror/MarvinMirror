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

var ftAPI = require("../src/ftAPI");
var manageDOM = require("../src/manageDOM");
var Student = require("../src/mongoDB").Models.Student;
var sendMessage = require("../src/controller").message;
var marvinReacts = require("../src/controller.js");

"use strict";

// CREATES HTML ELEMENTS WITH STUDENT INFO AND ADDS TO DOM
let showStudentToScreen = (obj) => {
	
	/*	Builds html objects and populates content with information from JSON
		from ftAPI call */
	if (obj != null) {    
        
		var elements = [
			"student", "ft_displayname", "ft_login", "ft_profile_pic",
			"ft_location", "ft_level", "ft_correction_points"
		];
        
		// BUILDS DIVS IN HTML
		manageDOM.array2Div(elements);
		document.getElementById("student").className = "student center-div";
        
		let student = {};
		student.name = "<p>" + obj.displayname  + "</p>";
		student.login = "<p>(" + obj.login + ")</p>";
		student.profile_pic = obj.image_url;
		student.location = "<p>" + (obj.location ? obj.location : "Unavailable") + "</p>";
		student.level = "<p>Level: " + obj.cursus_users[0].level + "</p>";
		student.correction_point = "<p>Correction points: " + obj.correction_point + "</p>";
        
		// ADDS CONTENT TO HTML WITH DATA RETRIEVED FROM API
		var profile_pic = document.createElement("img");
		profile_pic.id = "ft_pic";
		profile_pic.src = student.profile_pic;
		document.getElementById("ft_profile_pic").appendChild(profile_pic);
		document.getElementById("ft_displayname").innerHTML = student.name;
		document.getElementById("ft_login").innerHTML = student.login;
		document.getElementById("ft_location").innerHTML = student.location;
		document.getElementById("ft_level").innerHTML = student.level;
		document.getElementById("ft_correction_points").innerHTML = student.correction_point;
	}

};

/*  Calls 42 API to grab <= 100 JSON files that contain only student login
    and unique ID */
var getStudentPages = (n) => {
	let qs = {
		sort: "id",
		"page[size]": "100",
		"page[number]": n
	};
	return ftAPI.query42("/v2/users", qs)
		.then(array => {
			for (var i = 0; i < array.length; i++) {
				let update = {
					"studentID": array[i].id,
					"login" : array[i].login    
				};
				let find_query = {"studentID": array[i].id};
				let options = { upsert: true, new: true};
				Student.findOneAndUpdate(find_query, update, options, (err) => {
					if (err) throw err;
				});
			}
			if (array.length === 0) throw ("no more student pages");
			return Promise.resolve();
		})
		.catch(e => {throw e;});
};

var v2Students = {

	/*  Recursive call that cycles through all 42 API pages of users and updates 
        any new students/IDs */
	getAllStudents: (n) => {
		return getStudentPages(n)
			.then(() => {v2Students.getAllStudents(n + 1);})
			.catch(console.error);
	},

	/*  Displays information about a searched student on the screen */
	studentInfo: (data) => {
		var login = data.toLowerCase();
		marvinReacts.process_gif();

		Student.findOne({"login": login}).exec((err, data) => {
			if (data !== null)
			{
				ftAPI.query42("/v2/users/" + data.studentID)
					.then(showStudentToScreen)
					.catch(console.error);
			}
			else {
				sendMessage("I cannot find any user with this login in our database.");
			}
		});
	}
};

module.exports = v2Students;