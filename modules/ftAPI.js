var express = require('express');
var app = express();
var request = require('request');
var config = require('../config/config');
var ftOauth = config.ftOauth;

var accessToken = "cf236ff4e4ce085575d73937a18576dbba3dbcff2416acd253ac7e4f626800c6";
var refreshToken = "87bf020d0e387053e78423b86565a4b3727da025bca304af85031e4c46cff1c7";
var ftUrl = "https://api.intra.42.fr";

// DOESNT WORK YET
var getNewToken = function () {
    request({
        url: ftOauth.tokenURL,
        method: 'POST',
        form: {
            'refresh_token': refreshToken,
            'client_id': ftOauth.client_id,
            'client_secret': ftOauth.client_secret,
            'grant_type': 'refresh_token'
        }
      }, function(err, res) {
        console.log("Get new token: " + res.body);
        // var json = JSON.parse(res.body);
        // console.log(json);
      });
}

var ftAPI = {
    
    getCode: function () {

    },

    getToken: function () {
        request({
            url: ftOauth.tokenURL,
            method: 'POST',
            form: {
                'grant_type': 'authorization_code',
                'client_id': ftOauth.client_id,
                'client_secret': ftOauth.client_secret,
                'code': "f4bc72573f971484d11c81eae79a594e27c17b1a2595ac97b5fcbed629264f6b",
                'redirect_uri': ftOauth.redirectUri
            }
          }, function(err, res) {
            var json = JSON.parse(res.body);
            console.log("Access Token:", json.access_token);
            console.log("Refresh Token:", json.refresh_token);
          });
    },

    query42: function (endPoint, callback) {
        request({
            url: ftUrl + endPoint, 
            auth: {
                'bearer': accessToken
            }
        }, function(err, res) {
            if (res.statusCode === 401){
                console.log(res.statusCode);
                console.log(obj);
                getNewToken();
            }
            else {
                var obj = JSON.parse(res.body);
                // console.log(res.statusCode);
                callback(obj);
            }
            console.log(res);
        });
    }
}

module.exports = ftAPI;