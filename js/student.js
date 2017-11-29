var ftAPI = require('../modules/ftAPI');
var manageDOM = require('../modules/manageDOM');

var getStudent = function (obj) {

    // removes from "content" div of app any div with id "wrapper"
    manageDOM.clearContent("left");
    
    // sets defaults from config file
    var currentWeather = config.currentWeather;
    
    // create an array with all of the separate divs with
    // appropriate names here
    var elements = [
        'me_displayname', 'me_profile_pic', 'me_location',
        'me_level', 'me_correction_points'
    ];
    
    // creates HTML
    manageDOM.array2Div(elements, "left");

    // any special elements should be created individually
    var profile_pic = document.createElement("img");
    profile_pic.id = "me_pic";
    profile_pic.src = obj.image_url;
    document.getElementById('me_profile_pic').appendChild(profile_pic);

    // sets styling for the content
    var css = document.getElementById('left_css');
    css.setAttribute('href', '../css/student.css');
  
    // adds content to html with data retrieved from API
    document.getElementById('me_displayname').innerHTML = obj.displayname;
    var location = obj.location;
    if (location === null){
        location = "Unavailable";
    }   
    document.getElementById('me_location').innerHTML = location;
    document.getElementById('me_level').innerHTML = "Level: " + obj.cursus_users[0].level;
    document.getElementById('me_correction_points').innerHTML = "Correction points: " + obj.correction_point;
}

function ftGetObj() {
	// ftAPI.getToken();
    ftAPI.query42("/v2/me", getStudent);    
}