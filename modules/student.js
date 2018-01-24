var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');

// This is simply copied over from user.js for ease of use. May be discarded
function activeStudent() {
    
    this.location = "";
    this.login = ""
    this.profile_pic = "";
    this.name = "";
    this.level = "";
    this.correction_point = "";

}

// Handles filling html with student information passed as JSON object
function buildStudent(obj) {
 
    var user = new activeUser;

    user.name = "<p>" + obj.displayname  + "</p>";
    user.login = "<p>(" + obj.login + ")</p>";
    user.profile_pic = obj.image_url;
    user.location = "<p>" + (obj.location ? obj.location : "Unavailable") + "</p>";
    user.level = "<p>Level: " + obj.cursus_users[0].level + "</p>";
    user.correction_point = "<p>Correction points: " + obj.correction_point + "</p>";

    // adds content to html with data retrieved from API
    var profile_pic = document.createElement("img");
    profile_pic.id = "ft_pic";
    profile_pic.src = user.profile_pic;
    document.getElementById('ft_profile_pic').appendChild(profile_pic);

    document.getElementById('ft_displayname').innerHTML = user.name;
    document.getElementById('ft_login').innerHTML = user.login;
    document.getElementById('ft_location').innerHTML = user.location;
    document.getElementById('ft_level').innerHTML = user.level;
    document.getElementById('ft_correction_points').innerHTML = user.correction_point;
}

// Could be combined with above
var getStudentInfo = function (obj) {
    
        console.log(obj);
   
        // removes from "content" div of app any div with id "wrapper"
        manageDOM.clearContent("content");
        if (obj != null) {
            
        // create an array with all of the separate divs with
        // appropriate names here
        var elements = [
            'student', 'ft_displayname', 'ft_login', 'ft_profile_pic',
            'ft_location', 'ft_level', 'ft_correction_points'
        ];
        
        // creates HTML
        manageDOM.array2Div(elements, "content");
        console.log(document.getElementById('ft_level'))
        buildStudent(obj);
    }
}    

// There is no direct-to-student from login via the API so 2 requests are needed. This is the second and 
// feeds comprehensive student data object to callback function
var getStudentID = function (obj) {

    console.log(obj);
    if (obj.length > 0){
        return ftAPI.query42("/v2/users/" + obj[0].id);
    }
    else {
        return (null);
    }
}

// The first step is to get the user/:id by using the login from this endpoint
var loadStudent = () => {
    
    var login = document.getElementById('popup__form').value;
    
    if (login !== null) {
        ftAPI.query42("/v2/users/?filter[login]=" + login)
            .then(getStudentID)
            .then(getStudentInfo)
            .catch(console.error);
    }

    document.body.removeChild(document.getElementById('popup'));
}

module.exports = loadStudent;