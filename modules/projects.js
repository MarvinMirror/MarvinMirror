var ftAPI = require("../src/ftAPI");
var manageDOM = require("../src/manageDOM");
var marvinReacts = require("../src/controller");
var sendMessage = require("../src/controller").message;
var ProjectID = require("../src/mongoDB").Models.ProjectID;
var Student = require("../src/mongoDB").Models.Student;

/*  Helper function for sorting finished arrays by top marks */
function compareFinalMark(a,b) {
	if (a.final_mark > b.final_mark) { return 1; }
	else { return 0; }
}

/* Sorts student projects by best score and displays it on the app */
function showBestProjects(studentProjectsArray) {
    
	let arr = studentProjectsArray[1];
    
	manageDOM.clearContent("content");
        
	let finished = [];
	for (let i = 0 ; i < arr.length ; i++) {
		let obj = arr[i];
		if (obj.cursus_ids[0] === 1 && obj.status === "finished") {
			finished.push(obj);
		}
		else if (obj.cursus_ids[0] === 1 && obj.status === "in_progress")
			console.log(obj.project.name);
	}
	finished.sort(compareFinalMark);
        
	let divs = ["best-projects", "best-projects__header", "best-projects__person"];
	let innerName = [];
	let innerScore = [];
        
	for (let i = 0 ; i < 5 && i < finished.length ; i++) {
		let obj = finished[finished.length - 1 - i];
		divs.push("best-projects--" + i);
		innerName.push(obj.project.name);
		innerScore.push(obj.final_mark);
	}
        
	manageDOM.array2Div(divs, "popup");
	document.getElementById("best-projects").className = "best-projects center-div";
        
	let header = document.getElementById("best-projects__header");
	let person = document.getElementById("best-projects__person");
        
	header.innerHTML = "Here are the best-scoring projects for:";
	person.innerHTML = studentProjectsArray[0];

	header.className = "best-projects__header";
	person.className = "best-projects__person";
        
	for (let i = 3 ; i < 8 && i < divs.length ; i++) {
		let d = document.getElementById(divs[i]);
		d.setAttribute("class", "best-projects__item");
		let a = document.createElement("div");
		let b = document.createElement("div");
            
		d.append(a, b);
		a.innerHTML = innerName[i - 3];
		b.innerHTML = innerScore[i - 3];
	}
}
    
var ftProjectCalls = {
        
	// Takes 5+ secs
	// Lists projects by course
	getProjectId: (n) => {
		let qs = {
			sort: "id",
			"page[size]": "100",
			"page[number]": n
		};
		return ftAPI.query42("/v2/cursus/1/projects", qs)
			.then(array => {
				for (var i = 0; i < array.length; i++) {
					let update = {
						"projectID": array[i].id,
						"projectName": array[i].name
					};
					let find_query = {"projectID": array[i].id};
					let options = { upsert: true, new: true };
					ProjectID.findOneAndUpdate(find_query, update, options, () => {
						console.log("updated");
					});
				}
				if (array.length === 0) throw ("no more project pages");
				return Promise.resolve();
			})
			.catch(e => {throw e;});
	},
    
	// for any projects with subprojects like piscines
	getProjectsProjects: () => {
		let qs = {
			sort: "id",
			"page[size]": "100"
		};
		ftAPI.query42("/v2/projects/" + projectID + "/projects", qs)
			.then(console.log)
			.catch(console.error);
	},
    
	// returns UID and login of all users of current project
	listAllProjectUsers: () => {
		let qs = {
			sort: "id",
			"page[size]": "100"
		};
		ftAPI.query42("/v2/projects/" + projectID + "/users", qs)
			.then(console.log)
			.catch(console.error);
	},
    
	// Takes 5+ secs
	// List all projects
	listAllProjects: () => {
		let qs = {
			sort: "id",
			"page[size]": "100"
		};
		ftAPI.query42("/v2/projects/", qs)
			.then(array => {
				for (var i = 0; i < array.length; i++) {
					console.log(array[i].name + ":" + array[i].id);
				}
			})
			.catch(console.error);
	},
        
	getProjectsTeams: () => {
		let qs = {
			"filter[closed]": "false",
			"sort": "-created_at",
			"page[size]": "100"
		};
		ftAPI.query42("/v2/projects/" + projectID + "/teams", qs)
			.then(console.log)
			.catch(console.error);
	},
        
	// Returns basic info about the project
	getProjectDetails: () => {
		let qs = {
			// sort: "id",
			// "page[size]": "100"
		};
		ftAPI.query42("/v2/projects/" + projectID, qs)
			.then(console.log)
			.catch(console.error);
	},
        
	// Not authorized
	getProjectSessionsByID: () => {
		let qs = {
			// sort: "id",
			// "page[size]": "100"
		};
		ftAPI.query42("/v2/project_sessions/1", qs)
			.then(console.log)
			.catch(console.error);
	},
        
	// THIS MIGHT BE IT! Campus filter still doesn't work :(
	getProjectsUsersByID: () => {
		let qs = {
			"range[final_mark]": "70,125",
			sort: "updated_at",
			"filter[campus]": "7"
			// "page[size]": "100"
		};
		ftAPI.query42("/v2/projects/" + projectID + "/projects_users", qs)
			.then(console.log)
			.catch(console.error);
	},
    
	// Returns details for every project done or in progress by user
	getProjectsUsersByUser: (student) => {
		let qs = {
			// "range[final_mark]": "null,null",
			sort: "updated_at",
			"filter[cursus]": "1",
			"page[size]": "100"
		};
		if (student)
		{
			console.log("id = " + student.studentID);
			ftAPI.query42("/v2/users/" + student.studentID + "/projects_users", qs)
				.then((arr) => {
					let projectArray = [student.login, arr];
					showBestProjects(projectArray);
				})
				.catch(console.error);
		}
	},
        
	// Weird sudo data about projects
	getProjectsUsers: () => {
		let qs = {
			sort: "project_id",
			// "page[size]": "100"
		};
		ftAPI.query42("/v2/projects_users", qs)
			.then(console.log)
			.catch(console.error);
	},
        
	// Returns coordinates? and project_sessions id
	getProjectsData: () => {
		let qs = {
			sort: "id",
			// "filter[pool_year]": "2017",
			// "filter[first_name]": "David",
			// campus_id: 7,
			"page[size]": "100"           
		};
		ftAPI.query42("/v2/project_data", qs)
			.then(console.log)
			.catch(console.error); 
	}
};

let noLogin = "Please ask marvin again and provide a student login with the input provided.";
let badLogin = "No user with that login was found in our database. Please ask me again and provide a valid login.";
    
var projectFunctions = {
        
	/*  Recursive call that cycles through all 42 API pages of users and updates 
        any new projects/IDs */
	getAllProjects: (n) => {
		return ftProjectCalls.getProjectId(n)
			.then(() => {projectFunctions.getAllProjects(n + 1);})
			.catch(console.error);
	},

        
	/*  Marvin function that display's a user's top 5 projects on screen */
	getBestProjects: () => {
		var login = document.getElementById("popup__form").value;
		marvinReacts.process_gif();
		Student.findOne({"login": login}).exec((err, data) => {
			if (data) ftProjectCalls.getProjectsUsersByUser(data);
			else {
				let msg = login === "" ? noLogin : badLogin;
				sendMessage(msg);
			}
		});
	}
};
    
module.exports = projectFunctions;