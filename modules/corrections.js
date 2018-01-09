var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var request = require('request-promise');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var ProjectID = require('../src/mongoDB').ProjectID;

var correctionFunctions = {

    // Returns correction pairs but is not filterable by campus
    getScaleTeams: () => {
        let qs = {
            sort: "-begin_at"
        };
        ftAPI.query42("/v2/scale_teams", qs)
        .then(console.log)
        .catch(console.error); 
    },

    // Returns correction pairs specific to a project. I think default is
    // sort by most recent
    getProjectScaleTeams: () => {
        let qs = {
            // sort: "-begin_at"
        };
        ftAPI.query42("/v2/projects/" + projectID + 
        "/scale_teams", qs)
        .then(console.log)
        .catch(console.error); 
    },

    // Returns correction pairs (both corrector and corrected) for a given user
    // Look for projectID under "teams" object
    getUserScaleTeams: (id) => {
        let qs = {
            // sort: "-final_mark"
            "page[size]": "10"
        };
        return ftAPI.query42("/v2/users/" + id + 
        "/scale_teams", qs)
    },

    // I had no corrections but I assume it has all of current user's stuff
    getMyScaleTeams: () => {
        let qs = {
            // sort: "-begin_at"
        };
        ftAPI.query42("/v2/me/scale_teams", qs)
        .then(console.log)
        .catch(console.error); 
    }
}

function dateFormat(dateTime, format) {
    return moment(Date.parse(dateTime)).format(format);
}

// Handles filling html with student information passed as JSON object
function buildStudent(obj) {
   
       document.getElementById('title').innerHTML = "Last correction:";
       document.getElementById('begin_at').innerHTML = dateFormat(obj.begin_at, "MMMM D, YYYY @ HH:mm");
       document.getElementById('corrected').innerHTML = obj.correcteds[0].login;
       document.getElementById('corrector').innerHTML = "Corrected by: " + obj.corrector.login;
       document.getElementById('project').innerHTML = "Project ID: " + obj.team.project_id;
       document.getElementById('final_mark').innerHTML = "Final mark: " + obj.final_mark;
       document.getElementById('comments').innerHTML = "Corrector comments: " + obj.comment;
   }

var showCorrections = function (obj) {
    
    console.log(obj);

    // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("content");
    if (obj != null) {
            
        // create an array with all of the separate divs with
        // appropriate names here
        var elements = [
            'title', 'begin_at', 'corrector', 'corrected', 'project',
            'final_mark', 'comments'
        ];
        
        // creates HTML
        manageDOM.array2Div(elements, "content");

        buildStudent(obj[0]);
    }
}

var getStudentInfo = function (obj) {
    
    if (obj.length > 0){
        return ftAPI.query42("/v2/users/" + obj[0].id);
    }
    else {
        return (null);
    }
}

var getScaleTeams = function (obj) {
    
    if (obj.length > 0){
        return correctionFunctions.getUserScaleTeams(obj[0].id);
    }
    else {
        return (null);
    }
}

function loadCorrections() {
    
    var login = getLocation(document.getElementById('student_form').value)
    
    if (login !== null) {
        ftAPI.query42("/v2/users/?filter[login]=" + login)
            .then(getScaleTeams)
            .then(showCorrections)
            .catch(e => {
                console.log("error: " + e + "Getting new token and re-running");
                // ftAPI.getNewToken()
                //     .then(() => {
                //         return Promise.resolve(ftAPI.query42("/v2/users/?filter[login]=" + login));
                //         })
                //     .then(getScaleTeams)
                //     .then(showCorrections)
                //     .catch(console.error);
            });
    }
}