var ftAPI = require('../modules/ftAPI');
var manageDOM = require('../modules/manageDOM');

function activeUser() {
    
    this.location = "<p>Location: Marvin's Mirror</p>";
    this.login = ""
    this.profile_pic = "../img/guest_pic.png";
    this.name = "<p>New Hitchhiker</p>";
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
    profile_pic.id = "me_pic";
    profile_pic.src = user.profile_pic;
    document.getElementById('me_profile_pic').appendChild(profile_pic);
    
    document.getElementById('me_displayname').innerHTML = user.name;
    document.getElementById('me_login').innerHTML = user.login;
    document.getElementById('me_location').innerHTML = user.location;
    document.getElementById('me_level').innerHTML = user.level;
    document.getElementById('me_correction_points').innerHTML = user.correction_point;
}

var getUser = function (obj) {

    // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("left");
    
    // create an array with all of the separate divs with
    // appropriate names here
    var elements = [
        'me_displayname', 'me_login', 'me_profile_pic', 'me_location',
        'me_level', 'me_correction_points'
    ];
    
    // creates HTML
    manageDOM.array2Div(elements, "left");

    // sets styling for the content
    var css = document.getElementById('left_css');
    css.setAttribute('href', '../css/user.css');

    buildInfo(obj);
}


function loadUser(guest) {
    

    if (!guest){
        getUser(null);
    }
    else {
        // ftAPI.getToken();
        ftAPI.query42("/v2/me", getUser);    
    }
}

