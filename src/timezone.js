/******************************************************************************\
**  __  __          _______      _______   ___  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |    _/|_    /| |  | |  _  /       Anastasia Zimina           **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

var promiseJSON = require("../src/getJSON").promiseJSON;
var config = require("../config/config.js");

/*
** With the momentjs module we will be able to easily
** set timezone and hopefully change it easily with
** voice command.
*/

function makeTimeZoneQuery(geoLocation)
{
	return (config.geoNamesAPI.timezone + "lat=" + geoLocation.lat + "&lng=" + geoLocation.lng + "&username=" + config.geoNamesAPI.username);
}

function makeSearchQuery(place)
{
	return (config.geoNamesAPI.search + place + "&maxRows=1&username=" + config.geoNamesAPI.username);
}

function getTimeZoneObj(data) {
	var geoLocation = {
		lat: data.geonames[0].lat,
		lng: data.geonames[0].lng,
		name: data.geonames[0].toponymName
	};
	var new_url = makeTimeZoneQuery(geoLocation);
	return promiseJSON(new_url);
}

var timezone = {

	/*  Returns a promise containing the timezone ID as
        a string compatible with the moment-timezone module */
	getTimeZone: (place) => {
		var url = makeSearchQuery(place);
            
		return promiseJSON(url)
			.then(getTimeZoneObj)
			.then( (data) => {
				return data.timezoneId;
			});
            
	},
        
	/*  Returns a promise containing the offset from GMT as
        an int compatible with the moment-timezone module */
	getTimeOffset: (place) => {
		var url = makeSearchQuery(place);
        
		return promiseJSON(url)
			.then(getTimeZoneObj)
			.then( (data) => {
				return data;
			});
	}
};

module.exports = timezone;