var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var request = require('request-promise');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var ProjectID = require('../src/mongoDB').Models.ProjectID;
var Student = require('../src/mongoDB').Models.Student;
var Test = require('../src/mongoDB').Models.Test;
var marvin_reaction = require('../src/controller.js');

// Dummy vars for testing
var projectID = 985;
var userID = 22978;

// Recursive call to get all projects and IDs and cycle through pages
function getAllProjects (n) {
   return projectFunctions.getProjectId(n)
        .then(() => {console.log(n); getAllProjects(n + 1)})
        .catch(console.error);
}

// Dev function to make sure DB is updating appropriately
function checkProjectDB () {
    // query = ProjectID.findOne({'projectID': 27});
    query = ProjectID.find();
    // query = Student.find();
    // query = Student.remove();
    // query = Student.findOneAndUpdate({'studentID': 1234}, {'studentID': 1234, 'login': 'test12'}, {upsert: true});
    // query = Student.create({'studentID': 1234});

    query.exec((err, data) => {
        if (err) console.error(err);
        // console.log(data.projectID + " : " + data.projectName);
        console.log(data);
    }) ;
}

function compare(a,b) {
    if (a.final_mark > b.final_mark) { return 1; }
    else { return 0; }
}

function printUserProjectSpecs (pass) {
    
    let arr = pass[1];

    manageDOM.clearContent("content");
    
    for (i = 0 ; i < arr.length ; i++) {
        let obj = arr[i];
        // if (obj.status === "in_progress") {
        //     console.log("Project: " + obj.project.name);    
        // }
    }

    let done = [];
    for (i = 0 ; i < arr.length ; i++) {
        let obj = arr[i];
        if (obj.cursus_ids[0] === 1 && obj.status === "finished") {
            done.push(obj);
        }
        else if (obj.cursus_ids[0] === 1 && obj.status === "in_progress")
            console.log(obj.project.name);
    }
    done.sort(compare);

    let divs = ['best-projects', 'best-projects__header', 'best-projects__person'];
    let innerName = [];
    let innerScore = [];
    
    for (i = 0 ; i < 5 && i < done.length ; i++) {
        let obj = done[done.length - 1 - i];
        divs.push("best-projects--" + i);
        innerName.push(obj.project.name);
        innerScore.push(obj.final_mark);
    }

    manageDOM.array2Div(divs, "popup");
    document.getElementById("best-projects").className = "best-projects center-div"

    let header = document.getElementById('best-projects__header');
    let person = document.getElementById('best-projects__person');

    header.innerHTML = "Here are the best-scoring projects for:";
    person.innerHTML = pass[0][0].login;

    header.setAttribute('class', 'best-projects__header');
    person.setAttribute('class', 'best-projects__person');

    for (i = 3 ; i < 8 && i < divs.length ; i++) {
        let d = document.getElementById(divs[i]);
        d.setAttribute('class', 'best-projects__item');
        let a = document.createElement('div');
        let b = document.createElement('div');

        d.append(a, b);
        a.innerHTML = innerName[i - 3];
        b.innerHTML = innerScore[i - 3];
    }
}

var projectFunctions = {

    // Takes 5+ secs
    // Lists projects by course
    getProjectId: (n) => {
        let qs = {
            sort: "id",
            "page[size]": "100",
            "page[number]": n
        }
        return ftAPI.query42("/v2/cursus/1/projects", qs)
        .then(array => {
            for (var i = 0; i < array.length; i++) {
                let update = {
                    'projectID': array[i].id,
                    'projectName': array[i].name
                }
                let find_query = {'projectID': array[i].id};
                let options = { upsert: true, new: true };
                ProjectID.findOneAndUpdate(find_query, update, options, () => {
                    console.log(array[i].name + ":" + array[i].id);
                    console.log("updated");
                });
            }
            if (array.length === 0) throw ("no more pages");
            return Promise.resolve();
        })
        .catch(e => {throw e});
    },

    // for any projects with subprojects like piscines
    getProjectsProjects: () => {
        let qs = {
            sort: "id",
            "page[size]": "100"
        }
        ftAPI.query42("/v2/projects/" + projectID + "/projects", qs)
        .then(console.log)
        .catch(console.error);
    },

    // returns UID and login of all users of current project
    getProjectsIDUsers: () => {
        let qs = {
            sort: "id",
            "page[size]": "100"
        }
        ftAPI.query42("/v2/projects/" + projectID + "/users", qs)
        .then(console.log)
        .catch(console.error);
    },
    
    // Takes 5+ secs
    // List all projects
    getProjects1: () => {
        let qs = {
            sort: "id",
            "page[size]": "100"
        }
        ftAPI.query42("/v2/projects/", qs)
        .then(array => {
            for (var i = 0; i < array.length; i++) {
                console.log(array[i].name + ":" + array[i].id);
            }
        })
        .catch(console.error);
    },
   
    // Takes 10+ secs
    // List all projects for current user
    getProjectsMe: () => {
        let qs = {
            // sort: "id",
            "page[size]": "100"
        }
        ftAPI.query42("/v2/me/projects/", qs)
        .then(console.log)
        .catch(console.error);
    },
    
    getProjectsTeams: () => {
        let qs = {
            "filter[closed]": "false",
            "sort": "-created_at",
            "page[size]": "100"
        }
        ftAPI.query42("/v2/projects/" + projectID + "/teams", qs)
        .then(console.log)
        .catch(console.error);
    },
    
    // Returns basic info about the project
    getProjectDetails: () => {
        let qs = {
            // sort: "id",
            // "page[size]": "100"
        }
        ftAPI.query42("/v2/projects/" + projectID, qs)
        .then(console.log)
        .catch(console.error);
    },
    
    // Not authorized
    getProjectSessionsByID: () => {
        let qs = {
            // sort: "id",
            // "page[size]": "100"
        }
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
        }
        ftAPI.query42("/v2/projects/" + projectID + "/projects_users", qs)
        .then(console.log)
        .catch(console.error);
    },
    
    // Returns details for every project done or in progress by user
    getProjectsUsersByUser: (id) => {
        let qs = {
            // "range[final_mark]": "null,null",
            sort: "updated_at",
            "filter[cursus]": "1",
            "page[size]": "100"
        }
        if (id.length)
        {
        console.log("id = " + id[0].id);
        ftAPI.query42("/v2/users/" + id[0].id + "/projects_users", qs)
            .then((arr) => {
                let pass = [id, arr];
                printUserProjectSpecs(pass);
            })
            .catch(console.error);
        }
        else send_message('I can not find any user with this login in our database');
    },

    // Weird sudo data about projects
    getProjectsUsers: () => {
        let qs = {
            sort: "project_id",
            // "page[size]": "100"
        }
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
}

// The first step is to get the user/:id by using the login from this endpoint
var loadStudentProjects = () => {
    
    var login = document.getElementById('popup__form').value;
    marvin_reaction.process_gif();
    console.log(login);
    if (login !== null) {
        ftAPI.query42("/v2/users/?filter[login]=" + login)
            .then(projectFunctions.getProjectsUsersByUser)
            .catch(console.error);
    }

    document.body.removeChild(document.getElementById('popup'));
}

module.exports = loadStudentProjects;