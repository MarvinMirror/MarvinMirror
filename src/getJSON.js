/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Kyle Murray                **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \       Anastasia Zimina           **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

const request = require('request-promise');

/*  Uses a get request to return a JSON object from a URL,
    with callback function method */
var getJSON = function(url, callback) {

	request.get(url, (error, response, body) => {
		let json = JSON.parse(body);
		if (response.statusCode !== 200)
			callback(error, response);
		else
			callback(null, json);
	});

};

/*  Uses a get request to return a JSON object from a URL,
    with promise return method */
var promiseJSON = async function(url) {
    const options = {
        method: 'GET',
        uri: url,
        json: true
    };
    try {
        const response = await request(options);
        return Promise.resolve(response);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

module.exports = getJSON;
module.exports.promiseJSON = promiseJSON;

