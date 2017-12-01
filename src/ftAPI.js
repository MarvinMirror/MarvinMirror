var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs-extra');
var config = require('../config/config');
var ftOauth = config.ftOauth;

var ftUrl = "https://api.intra.42.fr";

// resets txt file with new token
function writeFile(filename, token) {

    fs.closeSync(fs.openSync(filename, 'w'));
    fs.writeFileSync(filename, token, 'utf-8');
}

// this function is called if '401 unauthorized' error is returned from 42 API
var getNewToken = function (endPoint, callback) {
    fs.readFile("config/refreshToken.txt", "utf-8", function(err, data){
        if (err) throw err;
        request({
            url: ftOauth.tokenURL,
            method: 'POST',
            form: {
                'refresh_token': data,
                'client_id': ftOauth.client_id,
                'client_secret': ftOauth.client_secret,
                'grant_type': 'refresh_token'
            }
        }, function(err, res) {
            var newJSON = JSON.parse(res.body);
            console.log(res);
            writeFile("config/accessToken.txt", newJSON.access_token);
            writeFile("config/refreshToken.txt", newJSON.refresh_token);
            ftAPI.query42(endPoint, callback);
        });
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
                'code': "d7a0783a63c5080fcc954c7e09e02318fb43ab8d8faee7ab1f78630a4cfcb045",
                'redirect_uri': ftOauth.redirectUri
            }
          }, function(err, res) {
            var json = JSON.parse(res.body);
            console.log("Access Token:", json.access_token);
            console.log("Refresh Token:", json.refresh_token);
          });
    },

    // feeds a JSON object from whichever 42 API endpoint is given into the callback function
    query42: function (endPoint, callback) {
        fs.readFile("config/accessToken.txt", "utf-8", function(err, data){
            if (err) throw err;
            request({
                url: ftUrl + endPoint, 
                auth: {
                    'bearer': data
                }
            }, function(err, res) {
                if (res.statusCode !== 200){
                    console.log(res);
                    getNewToken(endPoint, callback);
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