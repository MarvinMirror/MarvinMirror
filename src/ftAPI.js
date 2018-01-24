var express = require('express');
var app = express();
var request = require('request-promise');
var fs = require('fs-extra');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var Token = require('../src/mongoDB').Models.Token;
mongoose.Promise = require('bluebird');

"use strict";

// RETURNS THE RESULTS OF DB REQUEST CONTAINING 42 API TOKENS
function execTokenPromise() {
    let query = Token.findOne({'db_id': '42'});
    let promise = query.exec();
    return promise;
}

// RETURNS A PROMISE CONTAINING THE RESULTS OF A 42 API QUERY
function ftRequest(data, endPoint, queryString) {
    let queryOptions = {
        url: ftOauth.ftUrl + endPoint, 
        auth: {
            'bearer': data.accessToken
        },
        qs: queryString
    }
    
    var ftPromise = new Promise ( (resolve, reject) => {
        
        console.log("Inside ftPromise");
        request(queryOptions, (err, result) => {
            if (err)
                reject (err);
            else if (result.statusCode === 401)
                reject (result.body);
            else
                resolve (result.body);
        });
    });
    
    return ftPromise
    .catch( err => {
        console.log(err);
        return ftAPI.getNewToken()
            .then( newData => {
                queryOptions.auth.bearer = newData.accessToken;
                return ftPromise
            });
    });
}
        
// INTEGRAL PART OF ftAPI.getNewToken() THAT USES THE REFRESH TOKEN
// FROM OUR MONGO DB TO UPDATE OUR DB WITH NEW TOKENS
function ftNewToken(data) {
    let queryOptions = {
        url: ftOauth.tokenURL,
        method: 'POST',
        form: {
            'refresh_token': data.refreshToken,
            'client_id': ftOauth.client_id,
            'client_secret': ftOauth.client_secret,
            'grant_type': 'refresh_token'
        }
    }
    return request(queryOptions);
}
    
// USED IN BOTH ftAPI.getToken AND ftAPI.getNewToken TO UPDATE THE DB
function updateFields(data) {
    let newJSON = JSON.parse(data);
    let find_query   = { 'db_id': '42' }; 
    let update  = { 'accessToken': newJSON.access_token, 'refreshToken': newJSON.refresh_token }; 
    let options = { new: true, upsert: true };
    
    let promise = Token.findOneAndUpdate(find_query, update, options).exec();
    
    return promise
        .then(() => {
            console.log("Updated tokens in db!");
            return Promise.resolve();})
        .catch(e => {return Promise.reject(e);});
}

var ftAPI = {
            
    //this function should be obsolete but don't remove it yet just in case
    //we lose tokens for some reason
    getToken: function () {
        request({
            url: ftOauth.tokenURL,
            method: 'POST',
            form: {
                'grant_type': 'authorization_code',
                'client_id': ftOauth.client_id,
                'client_secret': ftOauth.client_secret,
                'code': "55516c3ec955d58c1ffcb51e79f679851a7a7996d1c3176c7a8f982d83964ef6",
                'redirect_uri': ftOauth.redirectUri
            }
          }, function(err, res) {
            updateFields(res);
        });
    },

    // Logs to console the current ACCESS and REFRESH tokens stored in the DB
    checkTokens: function () {
        var query = Token.findOne({'db_id': '42'});
    
        query.exec(function(err, data){
            if (err) throw err;
            console.log("Access: " + data.accessToken);
            console.log("Refresh: " + data.refreshToken);
        });
    },

    // this function is called if '401 unauthorized' error is returned from 42 API
    // and uses our REFRESH TOKEN to generate a new token set
    getNewToken: () => {
        return execTokenPromise()
            .then(ftNewToken)
            .then(updateFields)
            .catch(console.error);
    },

    // this set of promises queries the 42 API at 'endPoint' and returns 
    // the JSON data provided
    query42: (endPoint, queryString) => {
        return execTokenPromise()
            .then((data) => ftRequest(data, endPoint, queryString))
            .then((data) => { return JSON.parse(data); })
            .catch( err => { throw err; });
    }
}

module.exports = ftAPI;