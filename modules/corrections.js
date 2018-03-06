require("request-promise");
require("mongoose");

var moment = require("moment");

var ftAPI = require("../src/ftAPI");
var manageDOM = require("../src/manageDOM");
var Student = require("../src/mongoDB").Models.Student;
var marvinReacts = require("../src/controller");
var sendMessage = require("../src/controller").message;
var showMap = require("../modules/maps").showMap;

/* Helper function for setting the time/date to specific format */
function dateFormat(dateTime, format) {
	return moment(Date.parse(dateTime)).format(format);
}

/* Obj to help developers pick out the best endpoint for the 42 API */
var correctionFunctions = {

	
	/* NO ACCESS TO SLOTS */
	getUserSlots: () => {
		let qs = {
			sort: "-begin_at"
		};
		// Student.findOne({"login": "kvandenb"}).exec((err, data) => {
		ftAPI.query42("/v2/projects/1/slots", qs)
			.then(console.log)
			.catch(console.error);
		// });
	},

	/* Returns correction pairs but is not filterable by campus */
	getScaleTeams: () => {
		let qs = {
			sort: "-begin_at"
		};
		ftAPI.query42("/v2/scale_teams", qs)
			.then(console.log)
			.catch(console.error); 
	},

	/* Returns all corrector/correcteds for a given project */
	getProjectScaleTeams: (projectID) => {
		let qs = {
			sort: "-begin_at"
		};
		ftAPI.query42("/v2/projects/" + projectID + 
        "/scale_teams", qs)
			.then(console.log)
			.catch(console.error); 
	},

	/*  Returns correction pairs for a given user as corrector
	    Look for projectID under "teams" object */
	getUserScaleTeams: (id) => {
		let qs = {
			sort: "-begin_at"
		};
		return ftAPI.query42("/v2/users/" + id + 
        "/scale_teams/as_corrector", qs);
	}
};

var showCorrections = function (data) {
    
	manageDOM.buildPopup();
    
	if (data != null) {
            
		/*  Builds all the elements for the next correction. The intent of the
            array2Div method is to build out many divs with specific labels at once */

		let arr = [];

		for (let i = 0 ; i < data.length && arr.length < 4 ; i++) {
			if (data[i].final_mark == null) {
				arr.push(data[i]);
			}
		}
		
		// console.log(arr);

		if (arr.length > 0) {
			var obj = arr[0];
			var sid = obj.correcteds[0].id;
			var slogin = obj.correcteds[0].login;
			console.log(sid);
			console.log(slogin);
			ftAPI.query42("/v2/users/" + sid)
				.then(showMap);
		}
		else {
			sendMessage("You do not have any<br>current unfinished corrections!<br><br> \
			Upcoming corrections may be viewed<br>on your intra.<br><br> \
			Ask me again if you're late for a correction to locate your destination on a cluster map!");
		}

	}
};


/*	Finds all past-due corrections for a given user as the corrector */
var loadCorrections = () => {
	
	var login = document.getElementById("popup__form").value;
	marvinReacts.process_gif();	
	if (login !== null) {
		Student.findOne({"login": login}).exec((err, data) => {
			if (data) {
				correctionFunctions.getUserScaleTeams(data.studentID)
					.then(showCorrections)
					.catch(console.error);
			}
		});
	}
	manageDOM.delPopup();
};

module.exports.corrector = loadCorrections;