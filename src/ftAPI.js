var express = require('express');
var app = express();
var request = require('request-promise');
var fs = require('fs-extra');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var Token = require('../src/mongoDB').Token;
mongoose.Promise = require('bluebird');

"use strict";

// This function is used in both getToken() and getNewToken to update the database entry
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

// returns a promise containing the results of DB query for tokens
function execTokenPromise() {
    let query = Token.findOne({'db_id': '42'});
    let promise = query.exec();
    return promise;
}

// returns a promise containing the results of 42 API query
function ftRequest(data, endPoint) {
    let queryOptions = {
        url: ftOauth.ftUrl + endPoint, 
        auth: {
            'bearer': data.accessToken
        }
    }
    return request(queryOptions);
}

// returns a promise 
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
    query42: (endPoint) => {
        return execTokenPromise()
            .then((data) => ftRequest(data, endPoint))
            .then((data) => {return Promise.resolve(JSON.parse(data));})
            .catch( err => {
                console.log('error: ' + err);
                throw err;
            });
    }
}

module.exports = ftAPI;