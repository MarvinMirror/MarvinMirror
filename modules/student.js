var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var $ = require("jquery");
var mongoose = require('mongoose');
var Student = require('../src/mongoDB').Models.Student;
var marvin_reaction = require('../src/controller.js');

'use strict';

let getUser = function (obj) {

    // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("user");
    
    if (obj){
        // create an array with all of the separate divs with
        // appropriate names here
        let elements = [
            'active-user', 'me_displayname', 'me_profile_pic', 'me_login',
            'me_level', 'me_correction_points'
        ];
        
        // creates HTML
        manageDOM.array2Div(elements, "user");

        let splitName = obj.displayname.split(' ').join('<br />');

        user.name = splitName;
        user.login = obj.login;
        user.profile_pic = obj.image_url;
        user.level = "Level: " + obj.cursus_users[0].level;
        user.correction_point = "Correction points:<br />" + obj.correction_point;
        
        // adds content to html with data retrieved from API
        var profile_pic = document.createElement("img");
        profile_pic.id = "me_pic";
        profile_pic.src = user.profile_pic;
        document.getElementById('me_profile_pic').appendChild(profile_pic);      
        document.getElementById('me_displayname').innerHTML = user.name;
        document.getElementById('me_login').innerHTML = user.login;
        document.getElementById('me_level').innerHTML = user.level;
        document.getElementById('me_correction_points').innerHTML = user.correction_point;
    }
    else {

        // create an array with all of the separate divs with
        // appropriate names here
        let elements = [
            'guest', 'guest_login', 'guest_pic', 'guest_displayname'
        ];
        
        // creates HTML
        manageDOM.array2Div(elements, "user");
        
        let guest = {
            profile_pic: "../img/guest_pic.png",
            name: "<p>New Hitchhiker</p>"
        }

        let guest_pic = document.createElement("img");
        guest_pic.id = "hh_pic";
        guest_pic.src = guest.profile_pic;
        document.getElementById('guest_pic').appendChild(guest_pic);      
        document.getElementById('guest_login').innerHTML = "Guest";
        document.getElementById('guest_displayname').innerHTML = guest.name;
    }
}

// CREATES HTML ELEMENTS WITH STUDENT INFO AND ADDS TO DOM
let showStudentToScreen = (obj) => {
    
    // CLEARS THE MAIN BOX ON THE MIRROR OF CONTENT
    manageDOM.clearContent("content");
    
    if (obj != null) {    

        var elements = [
            'student', 'ft_displayname', 'ft_login', 'ft_profile_pic',
            'ft_location', 'ft_level', 'ft_correction_points'
        ];
        
        // BUILDS DIVS IN HTML
        manageDOM.array2Div(elements, "popup");
        document.getElementById("student").className = "student center-div";

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
        document.getElementById('ft_profile_pic').appendChild(profile_pic);
        document.getElementById('ft_displayname').innerHTML = student.name;
        document.getElementById('ft_login').innerHTML = student.login;
        document.getElementById('ft_location').innerHTML = student.location;
        document.getElementById('ft_level').innerHTML = student.level;
        document.getElementById('ft_correction_points').innerHTML = student.correction_point;
    }

}

var v2Users = {

    // The first step is to get the user/:id by using the login from this endpoint
    studentInfo: () => {
        
        let login = document.getElementById('popup__form').value.toLowerCase();
        marvin_reaction.delete_gif();
        marvin_reaction.talk_message();
        manageDOM.buildPopup();
        if (login !== null && login !== "") {
            // query = Student.findOne({'login': login});
            
            Student.findOne({'login': login}).exec((err, data) => {
                if (data !== null)
                {
                    ftAPI.query42("/v2/users/" + data.studentID)
                    .then(showStudentToScreen)
                    .catch(console.error);
                }
                else send_message('I can not find any user with this login in our database');
            });
        }

        // THIS CODE WILL STAND UNTIL WE GET RID OF THE KEYBOARD
        document.body.removeChild(document.getElementById('popup'));
    },

    userInfo: () => {
        let login = null;
        let form = document.getElementById('popup__form');
    
        if (form)
            login = form.value.toLowerCase();
        
        if (!login || login === "")
            getUser(null);
        else {
            marvin_reaction.process_gif();
            Student.findOne({'login': login}).exec((err, data) => {
                ftAPI.query42("/v2/users/" + data.studentID)
                    .then(getUser)
                    .catch(console.error);
            });
        }
    
        // THIS CODE WILL STAND UNTIL WE GET CARD READER
        let popup = document.getElementById('popup');
        if (popup)
            document.body.removeChild(popup);
    }

}

module.exports = v2Users;