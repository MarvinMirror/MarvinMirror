var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var request = require('request-promise');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var ProjectID = require('../src/mongoDB').ProjectID;

// Dummy vars for testing
var projectID = 1;
var userID = 23626;

// Recursive call to get all projects and IDs and cycle through pages
function getAllProjects (n) {
   return projectFunctions.getProjectId(n)
        .then(() => {console.log(n); getAllProjects(n + 1)})
        .catch(console.error);
}

// Dev function to make sure DB is updating appropriately
function checkProjectDB () {
    query = ProjectID.findOne({'projectID': 27});
    
    query.exec((err, data) => {
        if (err) console.error(err);
        console.log(data.projectID + " : " + data.projectName);
    }) ;
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
    getProjectsUsersByUser: () => {
        let qs = {
            "range[final_mark]": "70,125",
            sort: "updated_at",
            "filter[campus]": "7"
            // "page[size]": "100"
        }
        ftAPI.query42("/v2/users/" + userID + "/projects_users", qs)
        .then(console.log)
        .catch(console.error);
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