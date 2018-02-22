require("request-promise");
require("mongoose");

var moment = require("moment");

var ftAPI = require("../src/ftAPI");
var manageDOM = require("../src/manageDOM");
var Student = require("../src/mongoDB").Models.Student;

/* Helper function for setting the time/date to specific format */
function dateFormat(dateTime, format) {
	return moment(Date.parse(dateTime)).format(format);
}

/* Obj to help developers pick out the best endpoint for the 42 API */
var correctionFunctions = {

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
			sort: "-final_mark"
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
		var elements = [
			"corrections", "title", "begin_at", "corrector", "corrected", "project",
			"final_mark", "comments"
		];
		manageDOM.array2Div(elements, "popup");

		document.getElementById("corrections").className = "corrections center-div";
    
		let obj = data[0];

		document.getElementById("title").innerHTML = "Last correction:";
		document.getElementById("begin_at").innerHTML = dateFormat(obj.begin_at, "MMMM D, YYYY @ HH:mm");
		document.getElementById("corrected").innerHTML = obj.correcteds[0].login;
		document.getElementById("corrector").innerHTML = "Corrected by: " + obj.corrector.login;
		document.getElementById("project").innerHTML = "Project ID: " + obj.team.project_id;
		document.getElementById("final_mark").innerHTML = "Final mark: " + obj.final_mark;
		document.getElementById("comments").innerHTML = "Corrector comments: " + obj.comment;
	}
};

/*	Finds all upcoming corrections for a given user as the corrector */
var loadCorrections = () => {
    
	var login = document.getElementById("popup__form").value;
	if (login !== null) {
		Student.findOne({"login": login}).exec((err, data) => {
			correctionFunctions.getUserScaleTeams(data.studentID)
				.then(showCorrections)
				.catch(console.error);
		});
	}

	document.body.removeChild(document.getElementById("popup"));
};

module.exports.corrector = loadCorrections;