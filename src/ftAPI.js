var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs-extra');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var Token = require('../src/mongoDB').Token;

// This function is used in both getToken() and getNewToken to update the database entry
var updateFields = function(res) {
    var newJSON = JSON.parse(res.body);
    // console.log("Access Token:", newJSON.access_token);
    // console.log("Refresh Token:", newJSON.refresh_token);
    var find_query   = { 'db_id': '42' }; 
    var update  = { 'accessToken': newJSON.access_token, 'refreshToken': newJSON.refresh_token }; 
    var options = { new: true, upsert: true };
    
    Token.findOneAndUpdate(find_query, update, options, function (err, doc) {
        console.log("Updated tokens in db!");
    });
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
                'code': "5644f8f0304114746f12ccb1b63fdc89fb40eed04ea86fab598784f1b1559291",
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
    getNewToken: function () {
        var query = Token.findOne({'db_id': '42'});
        
        query.exec(function(err, data){
            if (err) throw err;
            request({
                url: ftOauth.tokenURL,
                method: 'POST',
                form: {
                    'refresh_token': data.refreshToken,
                    'client_id': ftOauth.client_id,
                    'client_secret': ftOauth.client_secret,
                    'grant_type': 'refresh_token'
                }
            }, function(err, res) {
                updateFields(res);
            });
        });
    },

    // feeds a JSON object from whichever 42 API endpoint is given into the callback function
    query42: function (endPoint, callback) {

        // queries mongoDB for token document
        var query = Token.findOne({'db_id': '42'});
        
        query.exec(function(err, data){
            if (err) throw err;
            request({
                url: ftOauth.ftUrl + endPoint, 
                auth: {
                    'bearer': data.accessToken
                }
            }, function(err, res) {
                if (res.statusCode !== 200){
                    console.log("TIME FOR A NEW TOKEN");
                    // getNewToken();
                }
                else {
                    var obj = JSON.parse(res.body);
                    callback(obj);
                }
            });
        });
    }
}

module.exports = ftAPI;