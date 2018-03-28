var request = require("request-promise");
var config = require("../config/config");
var ftOauth = config.ftOauth;
var mongoose = require("mongoose");
var Token = require("../src/mongoDB").Models.Token;
mongoose.Promise = require("bluebird");

"use strict";

/*  Helper function to grab current tokens for database */
function execTokenPromise() {
	let query = Token.findOne({"db_id": "42"});
	let promise = query.exec();
	return promise;
}

/*  Integral 42 API query function that returns a promise containing 
    the result of a 42 API query. Should the query fail due to 
    expired tokens, it obtains a new token and re-runs the API call without 
    further interaction from a user */
function ftRequest(data, endPoint, queryString) {
	let queryOptions = {
		url: ftOauth.ftUrl + endPoint, 
		auth: {
			"bearer": data.accessToken
			// 'bearer': "1234" // FOR REFRESH TOKEN TESTING PURPOSES
		},
		qs: queryString
	};
    
	var ftPromise = new Promise ( (resolve, reject) => {

		request(queryOptions, (err, result) => {
			if (err)
				reject (err);
			else
				resolve (result);
		});
	});
    
	return ftPromise
		.then ( ftObj => {
			if (ftObj.statusCode === 401) {
				return ftAPI.getNewToken()
					.then(execTokenPromise)
					.then( newData => {
						queryOptions.auth.bearer = newData.accessToken;
						return request(queryOptions);
					});
			}
			else 
				return ftObj.body;
		})
		.catch( err => {
			console.log(err);
		});
}

/*  Helper function that uses the refresh token in our database to update
    the database with a current set of tokens */
function ftNewToken(data) {
	let queryOptions = {
		url: ftOauth.tokenURL,
		method: "POST",
		form: {
			"refresh_token": data.refreshToken,
			"client_id": process.env.MARVIN_42_CLIENT_ID,
			"client_secret": process.env.MARVIN_42_CLIENT_SECRET,
			"grant_type": "refresh_token"
		}
	};
	return request(queryOptions);
}

/*  Helper function used in both ftAPI.getToken and ftAPI.getNewToken 
    to update the database */
function updateFields(data) {
	let newJSON = JSON.parse(data);
	let find_query   = { "db_id": "42" }; 
	let update  = { "accessToken": newJSON.access_token, "refreshToken": newJSON.refresh_token }; 
	let options = { new: true, upsert: true };
    
	let promise = Token.findOneAndUpdate(find_query, update, options).exec();
    
	return promise
		.then(() => {
			console.log("Updated tokens in db!");
			return Promise.resolve();})
		.catch(e => {return Promise.reject(e);});
}

var ftAPI = {
            
	/*  Initialization function to get unique user code which will generate
        initial token access to the 42 API */
	getToken: function () {
		request({
			url: ftOauth.tokenURL,
			method: "POST",
			form: {
				"grant_type": "authorization_code",
				"client_id": process.env.MARVIN_42_CLIENT_ID,
				"client_secret": process.env.MARVIN_42_CLIENT_SECRET,
				"code": "55516c3ec955d58c1ffcb51e79f679851a7a7996d1c3176c7a8f982d83964ef6",
				"redirect_uri": ftOauth.redirectUri
			}
		}, function(err, res) {
			updateFields(res);
		});
	},

	/*  developer function which logs to console the current ACCESS and
        REFRESH tokens stored in the DB */
	checkTokens: function () {
		var query = Token.findOne({"db_id": "42"});
    
		query.exec(function(err, data){
			if (err) throw err;
			console.log("Access: " + data.accessToken);
			console.log("Refresh: " + data.refreshToken);
		});
	},

	/*  Base function to generate new tokens if needed (current token is expired,
        etc) */
	getNewToken: () => {
		return execTokenPromise()
			.then(ftNewToken)
			.then(updateFields)
			.catch(console.error);
	},

	/*  Base function that will be called in any module which must access 42API 
        data. The dev must supply an 42 API endpoint and any query parameters in
        JSON object format.
        example:    let queryObject = {
                        "sort": "-begin_at",
                        "filter[campus]" = 1
                    } */
	query42: (endPoint, queryObject) => {
		return execTokenPromise()
			.then((data) => ftRequest(data, endPoint, queryObject))
			.then((data) => { return JSON.parse(data); })
			.catch( err => { throw err; });
	}
};

module.exports = ftAPI;