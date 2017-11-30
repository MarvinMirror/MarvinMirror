var ftAPI = require('../modules/ftAPI');
var manageDOM = require('../modules/manageDOM');

function activeUser() {
    
    this.location = "";
    this.login = ""
    this.profile_pic = "";
    this.name = "";
    this.level = "";
    this.correction_point = "";

}

function buildInfo(obj) {
 
    var user = new activeUser;

    if (obj)
    {
        user.name = "<p>" + obj.displayname  + "</p>";
        user.login = "<p>(" + obj.login + ")</p>";
        user.profile_pic = obj.image_url;
        user.location = "<p>" + (obj.location ? obj.location : "Unavailable") + "</p>";
        user.level = "<p>Level: " + obj.cursus_users[0].level + "</p>";
        user.correction_point = "<p>Correction points: " + obj.correction_point + "</p>";
    }

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

var getStudentInfo = function (obj) {
    
    console.log(obj);

    // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("content");
    
    // create an array with all of the separate divs with
    // appropriate names here
    var elements = [
        'ft_displayname', 'ft_login', 'ft_profile_pic', 'ft_location',
        'ft_level', 'ft_correction_points'
    ];
    
    // creates HTML
    manageDOM.array2Div(elements, "content");

    // sets styling for the content
    var css = document.getElementById('content_css');
    css.setAttribute('href', '../css/student.css');

    buildInfo(obj);
}    

var getStudentID = function (obj) {

    if (obj.length > 0){
        ftAPI.query42("/v2/users/" + obj[0].id, getStudentInfo)
    }
}


function loadStudent(login) {
    
    if (!login){
        //getStudent(null);
    }
    else {
        // ftAPI.getToken();
        ftAPI.query42("/v2/users/?filter[login]=" + login, getStudentID);    
    }
}

