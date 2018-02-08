var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var request = require('request-promise');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var ProjectID = require('../src/mongoDB').ProjectID;
var marvin_reaction = require('../src/controller.js');

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
        "/scale_teams/as_corrector", qs)
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

var showCorrections = function (data) {
    
    console.log(data);
    marvin_reaction.delete_gif();
    marvin_reaction.talk_message();
    manageDOM.buildPopup();
    // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("content");
    
    if (data != null) {
            
        // create an array with all of the separate divs with
        // appropriate names here
        var elements = [
            'corrections', 'title', 'begin_at', 'corrector', 'corrected', 'project',
            'final_mark', 'comments'
        ];
        
        // creates HTML
        manageDOM.array2Div(elements, "popup");

        document.getElementById('corrections').className = "corrections center-div";
    
        let obj = data[0];
        console.log(obj);

        document.getElementById('title').innerHTML = "Last correction:";
        document.getElementById('begin_at').innerHTML = dateFormat(obj.begin_at, "MMMM D, YYYY @ HH:mm");
        document.getElementById('corrected').innerHTML = obj.correcteds[0].login;
        document.getElementById('corrector').innerHTML = "Corrected by: " + obj.corrector.login;
        document.getElementById('project').innerHTML = "Project ID: " + obj.team.project_id;
        document.getElementById('final_mark').innerHTML = "Final mark: " + obj.final_mark;
        document.getElementById('comments').innerHTML = "Corrector comments: " + obj.comment;
    }
    else send_message('I can not find any user with this login in our database');
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

var loadCorrections = () => {
    
    var login = getLocation(document.getElementById('popup__form').value)
    marvin_reaction.process_gif();
    if (login !== null) {
        Student.findOne({'login': login}).exec((err, data) => {
            console.log(err);
            console.log(data);
            correctionFunctions.getUserScaleTeams(data.studentID)
                .then(showCorrections)
                .catch(console.error);
        });


        // ftAPI.query42("/v2/users/?filter[login]=" + login)
        //     .then(getScaleTeams)
        //     .then(showCorrections)
        //     .catch(console.error);
    }

    document.body.removeChild(document.getElementById('popup'));
}

var loadScaleTeams = () => {
    correctionFunctions.getScaleTeams();
}

module.exports = loadCorrections;